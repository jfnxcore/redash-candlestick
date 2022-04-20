# -*- coding: utf-8 -*-

from io import StringIO
import logging
import yaml

from redash.query_runner import BaseHTTPQueryRunner, NotSupported, register

from redash.utils import json_dumps

logger = logging.getLogger(__name__)

# TODO: copied the query and response parsing from csv.py query_runner. Could need improvement
try:
    import pandas as pd
    import numpy as np
    enabled = True
except ImportError:
    enabled = False
    
class QueryParseError(Exception):
    pass

def parse_query(query):
    # TODO: copy paste from Metrica query runner, we should extract this into a utility
    query = query.strip()
    if query == "":
        raise QueryParseError("Query is empty.")
    try:
        params = yaml.safe_load(query)
        return params
    except ValueError as e:
        logging.exception(e)
        error = str(e)
        raise QueryParseError(error)


class Alphavantage(BaseHTTPQueryRunner):
    """
    Query Runner supporting Alphavantage HTTP API based on BaseHTTPQueryRunner.

    This class is a proof of concept, the current version does not support the sclicing 
    attribute required by some API_FUNCTION (see https://www.alphavantage.co/documentation/#intraday-extended). 
    """
    requires_url = False
    requires_authentication = False

    @classmethod
    def configuration_schema(cls):
        return {
            "type": "object",
            "properties": {
                "api_key": {"type": "string", "title": "Alphavantage API key"},
            },
            "secret": ["api_key"],
        }

    @classmethod
    def enabled(cls):
        return enabled

    def __init__(self, configuration):
        super(Alphavantage, self).__init__(configuration)
        self.syntax = "yaml"

    def test_connection(self):
        pass

    def get_schema(self):
        raise NotSupported()

    def run_query(self, query, user):
        query = parse_query(query)

        if not isinstance(query, dict):
            raise QueryParseError("Query should be a YAML object describing the function to query.")

        if "api_function" not in query:
            raise QueryParseError("Query must include 'api_function' option.")

        api_function: str = query["api_function"]
        url: str = f"https://www.alphavantage.co/query?function={api_function}&apikey={self.configuration.get('api_key')}&datatype=csv"
        
        if "api_arguments" in query:
            api_arguments: dict =  query["api_arguments"] if "api_arguments" in query else {}
            if not isinstance(api_arguments, dict):
                raise QueryParseError("The option 'api_arguments' must be a YAML object")
            url = f"{url}&{'&'.join(map(lambda kv: '='.join(kv), api_arguments.items()))}"

        try:
            response, error = self.get_response(url, http_method="get")

            if error is not None:
                return None, error
        
            workbook = pd.read_csv(StringIO(response.text), sep = ",")

            df = workbook.copy()
            data = {'columns': [], 'rows': []}
            conversions = [
                {'pandas_type': np.integer, 'redash_type': 'integer',},
                {'pandas_type': np.inexact, 'redash_type': 'float',},
                {'pandas_type': np.datetime64, 'redash_type': 'datetime', 'to_redash': lambda x: x.strftime('%Y-%m-%d %H:%M:%S')},
                {'pandas_type': np.bool_, 'redash_type': 'boolean'},
                {'pandas_type': np.object, 'redash_type': 'string'}
            ]
            labels = []
            for dtype, label in zip(df.dtypes, df.columns):
                for conversion in conversions:
                    if issubclass(dtype.type, conversion['pandas_type']):
                        data['columns'].append({'name': label, 'friendly_name': label, 'type': conversion['redash_type']})
                        labels.append(label)
                        func = conversion.get('to_redash')
                        if func:
                            df[label] = df[label].apply(func)
                        break
            data['rows'] = df[labels].replace({np.nan: None}).to_dict(orient='records')

            json_data = json_dumps(data)
            error = None
        except Exception as e:
            error = "Error reading {0}. {1}".format(api_function, str(e))
            json_data = None

        return json_data, error

# extension function copied from redash-stmo extension
def extension(app):
    logger.info("Loading Redash Extension for the Alphavantage query runner")
    register(Alphavantage)
    logger.info("Loaded Redash Extension for the Alphavantahe query runner")
    return 