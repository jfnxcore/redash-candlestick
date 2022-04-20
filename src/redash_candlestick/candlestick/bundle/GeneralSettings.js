import { map, extend } from "lodash";
import React from "react";
import { Section, Select, ColorPicker, Switch } from "@redash/viz/lib/components/visualizations/editor";
import { default as ColorPalette } from "./ColorPalette";
import { EditorPropTypes } from "@redash/viz/lib/visualizations/prop-types";

export default function GeneralSettings({ options, data, visualizationName, onOptionsChange }) {
  return (
    <React.Fragment>

      <Section.Title>General</Section.Title>

      <Section>
        <Select
          layout="horizontal"
          label="Name Column"
          data-test="Candlestick.General.SerieColumn"
          defaultValue={options.serieColName}
          onChange={(serieColName) => onOptionsChange({ serieColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.SerieColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Select
          layout="horizontal"
          label="Time Column"
          data-test="Candlestick.General.DateColumn"
          defaultValue={options.dateColName}
          onChange={(dateColName) => onOptionsChange({ dateColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.DateColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Switch
          data-test="Candlestick.General.RangeSlider"
          defaultChecked={options.rangeSlider}
          onChange={(rangeSlider) => onOptionsChange({ rangeSlider })}>
          Range Slider
        </Switch>
      </Section>

      <Section>
        <Switch
          data-test="Candlestick.General.RangeSelector"
          defaultChecked={options.rangeSelector}
          onChange={(rangeSelector) => onOptionsChange({ rangeSelector })}>
          Range Selector
        </Switch>
      </Section>

      <Section.Title>Candlestick</Section.Title>

      <Section>
        <Select
          layout="horizontal"
          label="Open Column"
          data-test="Candlestick.General.OpenColumn"
          defaultValue={options.openColName}
          onChange={(openColName) => onOptionsChange({ openColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.OpenColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Select
          layout="horizontal"
          label="High Column"
          data-test="Candlestick.General.HighColumn"
          defaultValue={options.highColName}
          onChange={(highColName) => onOptionsChange({ highColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.HighColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Select
          layout="horizontal"
          label="Low Column"
          data-test="Candlestick.General.LowColumn"
          defaultValue={options.lowColName}
          onChange={(lowColName) => onOptionsChange({ lowColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.LowColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Select
          layout="horizontal"
          label="Close Column"
          data-test="Candlestick.General.CloseColumn"
          defaultValue={options.closeColName}
          onChange={(closeColName) => onOptionsChange({ closeColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.CloseColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <ColorPicker
          layout="horizontal"
          label="Increasing Color"
          interactive
          presetColors={ColorPalette}
          placement="topRight"
          color={options.increasingColor}
          triggerProps={{ "data-test": "Candlestick.General.IncreasingColor" }}
          onChange={(increasingColor) => onOptionsChange({ increasingColor })}
          addonAfter={<ColorPicker.Label color={options.increasingColor} presetColors={ColorPalette} />}
        />
      </Section>

      <Section>
        <ColorPicker
          layout="horizontal"
          label="Decreasing Color"
          interactive
          presetColors={ColorPalette}
          placement="topRight"
          color={options.decreasingColor}
          triggerProps={{ "data-test": "Candlestick.General.DecreasingColor" }}
          onChange={(decreasingColor) => onOptionsChange({ decreasingColor })}
          addonAfter={<ColorPicker.Label color={options.decreasingColor} presetColors={ColorPalette} />}
        />
      </Section>

      <Section.Title>Volume</Section.Title>

      <Section>
        <Select
          layout="horizontal"
          label="Volume Column"
          data-test="Candlestick.General.VolumColumn"
          defaultValue={options.volumeColName}
          disabled={!options.showVolume}
          onChange={(volumeColName) => onOptionsChange({ volumeColName })}>
          {map(data.columns, col => (
            <Select.Option key={col.name} data-test={"Candlestick.General.SerieColumn." + col.name}>
              {col.name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <ColorPicker
          layout="horizontal"
          label="Volume Color"
          interactive
          presetColors={ColorPalette}
          placement="topRight"
          color={options.volumeColor}
          disabled={!options.showVolume}
          triggerProps={{ "data-test": "Candlestick.General.VolumeColor" }}
          onChange={(volumeColor) => onOptionsChange({ volumeColor })}
          addonAfter={<ColorPicker.Label color={options.volumeColor} presetColors={ColorPalette} disabled={!options.showVolume} />}
        />
      </Section>

      <Section>
        <Switch
          data-test="Candlestick.General.ShowVolume"
          defaultChecked={options.showVolume}
          onChange={(showVolume) => onOptionsChange({ showVolume })}>
          Show Volume
        </Switch>
      </Section>

    </React.Fragment>
  );
}

GeneralSettings.propTypes = EditorPropTypes;
