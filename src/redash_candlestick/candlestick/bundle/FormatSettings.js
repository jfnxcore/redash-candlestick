import React from "react";
import { Section, Input, ContextHelp } from "@redash/viz/lib/components/visualizations/editor";
import { EditorPropTypes } from "@redash/viz/lib/visualizations/prop-types";

export default function FormatSettings({ options, data, onOptionsChange }) {

  return (
    <React.Fragment>

      <Section>
        <Input
          label={
            <React.Fragment>
              Number Values Format
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          data-test="Candlestick.FormatSettings.NumberFormat"
          defaultValue={options.numberFormat}
          onChange={(e) => onOptionsChange({ numberFormat: e.target.value })}
        />
      </Section>

      <Section>
        <Input
          label={
            <React.Fragment>
              Number Values Format
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          data-test="Candlestick.FormatSettings.DateFormat"
          defaultValue={options.dateFormat}
          onChange={(e) => onOptionsChange({ dateFormat: e.target.value })}
        />
      </Section>

    </React.Fragment>
  );
}

FormatSettings.propTypes = EditorPropTypes;
