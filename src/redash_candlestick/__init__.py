# -*- coding: utf-8 -*-


# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, you can obtain one at http://mozilla.org/MPL/2.0/.
"""Extensions to Redash"""

# from pkg_resources import DistributionNotFound, get_distribution

# try:
#     __version__ = get_distribution("redash-candlestick").version
# except DistributionNotFound:
#     # package is not installed
#     pass

from ._version import get_versions
__version__ = get_versions()['version']
del get_versions
