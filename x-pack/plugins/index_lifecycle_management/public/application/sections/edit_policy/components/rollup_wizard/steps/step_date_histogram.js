/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@kbn/i18n/react';
import moment from 'moment-timezone';

import {
  EuiDescribedFormGroup,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSpacer,
  EuiTitle,
  EuiSuperSelect,
  EuiText,
} from '@elastic/eui';

import { CALENDAR_INTERVAL_OPTIONS } from '../constants';

import { StepError } from './components';

const timeZoneOptions = moment.tz.names().map((name) => ({
  value: name,
  text: name,
}));

const calendarIntervalOptions = [
  {
    value: CALENDAR_INTERVAL_OPTIONS.minute,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.minuteOptionLabel',
      { defaultMessage: 'Every minute' }
    ),
  },
  {
    value: CALENDAR_INTERVAL_OPTIONS.hour,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.hourOptionLabel',
      { defaultMessage: 'Every hour' }
    ),
  },
  {
    value: CALENDAR_INTERVAL_OPTIONS.day,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.dayOptionLabel',
      { defaultMessage: 'Every day' }
    ),
  },
  {
    value: CALENDAR_INTERVAL_OPTIONS.week,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.weekOptionLabel',
      { defaultMessage: 'Every week' }
    ),
  },
  {
    value: CALENDAR_INTERVAL_OPTIONS.month,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.monthOptionLabel',
      { defaultMessage: 'Every month' }
    ),
  },
  {
    value: CALENDAR_INTERVAL_OPTIONS.quarter,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.quarterOptionLabel',
      { defaultMessage: 'Every quarter' }
    ),
  },
  {
    value: CALENDAR_INTERVAL_OPTIONS.year,
    text: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalField.yearOptionLabel',
      { defaultMessage: 'Every year' }
    ),
  },
];

export const i18nTexts = {
  timeIntervalField: {
    calendar: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalType.calendarLabel',
      { defaultMessage: 'Calendar' }
    ),
    fixed: i18n.translate(
      'xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalType.fixedLabel',
      { defaultMessage: 'Fixed' }
    ),
  },
};

export class StepDateHistogram extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    onFieldsChange: PropTypes.func.isRequired,
    fieldErrors: PropTypes.object.isRequired,
    hasErrors: PropTypes.bool.isRequired,
    areStepErrorsVisible: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { fields, onFieldsChange, areStepErrorsVisible, fieldErrors } = this.props;

    const {
      dateHistogramInterval,
      dateHistogramField,
      dateHistogramTimeZone,
      dateHistogramIntervalType,
    } = fields;

    const {
      dateHistogramInterval: errorDateHistogramInterval,
      dateHistogramField: errorDateHistogramField,
      dateHistogramTimeZone: errorDateHistogramTimeZone,
    } = fieldErrors;

    return (
      <Fragment>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiTitle size="s" data-test-subj="rollupCreateDateHistogramTitle">
              <h2>
                <FormattedMessage
                  id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogramTitle"
                  defaultMessage="Date histogram"
                />
              </h2>
            </EuiTitle>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiForm>
          <EuiDescribedFormGroup
            title={<div />}
            description={
              <Fragment>
                <p>
                  <FormattedMessage
                    id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogramDescription"
                    defaultMessage="Define how date histogram aggregations will operate on your rollup data."
                  />
                </p>

                <p>
                  <FormattedMessage
                    id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.sectionDataSourceDescription"
                    defaultMessage="Note that smaller time buckets take up proportionally more space."
                  />
                </p>
              </Fragment>
            }
            fullWidth
          >
            <EuiFormRow
              label={
                <FormattedMessage
                  id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldDateFieldLabel"
                  defaultMessage="Date field"
                />
              }
              error={errorDateHistogramField}
              isInvalid={Boolean(areStepErrorsVisible && errorDateHistogramField)}
              fullWidth
            >
              <EuiFieldText
                isInvalid={Boolean(areStepErrorsVisible && errorDateHistogramField)}
                value={dateHistogramField ?? ''}
                onChange={(e) => onFieldsChange({ dateHistogramField: e.target.value })}
                fullWidth
                data-test-subj="rollupCreateDateFieldSelect"
              />
            </EuiFormRow>
            <EuiFormRow
              label={
                <FormattedMessage
                  id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalTypeLabel"
                  defaultMessage="Time interval type"
                />
              }
              fullWidth
            >
              <EuiSuperSelect
                valueOfSelected={dateHistogramIntervalType}
                options={[
                  {
                    value: 'calendar',
                    inputDisplay: i18nTexts.timeIntervalField.calendar,
                    dropdownDisplay: (
                      <>
                        <EuiText size="s">{i18nTexts.timeIntervalField.calendar}</EuiText>
                        <EuiText size="s" color="subdued">
                          <FormattedMessage
                            id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalType.calendarHelpText"
                            // TODO: Copy required
                            defaultMessage="Takes varying day, month and year lengths into account."
                          />
                        </EuiText>
                      </>
                    ),
                  },
                  {
                    value: 'fixed',
                    inputDisplay: i18nTexts.timeIntervalField.fixed,
                    dropdownDisplay: (
                      <>
                        <EuiText size="s">{i18nTexts.timeIntervalField.fixed}</EuiText>
                        <EuiText size="s" color="subdued">
                          <FormattedMessage
                            id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalType.fixedHelpText"
                            // TODO: Copy required
                            defaultMessage="Each time interval is the same size."
                          />
                        </EuiText>
                      </>
                    ),
                  },
                ]}
                onChange={(value) =>
                  onFieldsChange({
                    dateHistogramIntervalType: value,
                    // Also reset the date histogram interval value
                    dateHistogramInterval: undefined,
                  })
                }
                fullWidth
                data-test-subj="rollupIntervalType"
              />
            </EuiFormRow>
            <EuiFormRow
              label={
                <FormattedMessage
                  id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldIntervalLabel"
                  defaultMessage="Time bucket size"
                />
              }
              error={errorDateHistogramInterval}
              isInvalid={Boolean(areStepErrorsVisible && errorDateHistogramInterval)}
              fullWidth
            >
              {dateHistogramIntervalType === 'calendar' ? (
                <EuiSelect
                  hasNoInitialSelection
                  options={calendarIntervalOptions}
                  value={dateHistogramInterval}
                  onChange={(e) => onFieldsChange({ dateHistogramInterval: e.target.value })}
                  fullWidth
                  data-test-subj="rollupCreateCalendarIntervalSelect"
                />
              ) : (
                <EuiFieldText
                  value={dateHistogramInterval || ''}
                  onChange={(e) => onFieldsChange({ dateHistogramInterval: e.target.value })}
                  isInvalid={Boolean(areStepErrorsVisible && errorDateHistogramInterval)}
                  fullWidth
                  data-test-subj="rollupCreateFixedIntervalTextField"
                />
              )}
            </EuiFormRow>

            <EuiFormRow
              label={
                <FormattedMessage
                  id="xpack.indexLifecycleMgmt.rollup.create.stepDateHistogram.fieldTimeZoneLabel"
                  defaultMessage="Time zone"
                />
              }
              error={errorDateHistogramTimeZone || ''}
              isInvalid={Boolean(areStepErrorsVisible && errorDateHistogramTimeZone)}
              fullWidth
            >
              <EuiSelect
                options={timeZoneOptions}
                value={dateHistogramTimeZone}
                onChange={(e) => onFieldsChange({ dateHistogramTimeZone: e.target.value })}
                fullWidth
                data-test-subj="rollupCreateTimeZoneSelect"
              />
            </EuiFormRow>
          </EuiDescribedFormGroup>
        </EuiForm>

        {this.renderErrors()}
      </Fragment>
    );
  }

  renderErrors = () => {
    const { areStepErrorsVisible, hasErrors } = this.props;

    if (!areStepErrorsVisible || !hasErrors) {
      return null;
    }

    return <StepError />;
  };
}
