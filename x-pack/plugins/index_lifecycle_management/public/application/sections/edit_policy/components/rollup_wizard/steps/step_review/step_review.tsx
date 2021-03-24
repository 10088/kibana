/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';

import { EuiTitle, EuiSpacer } from '@elastic/eui';

import { InternalRollup } from '../../types';

import { TabSummary } from './tab_summary';

interface Props {
  rollupAction: InternalRollup;
}

export const StepReview: FunctionComponent<Props> = ({ rollupAction }) => {
  return (
    <>
      <EuiTitle size="s" data-test-subj="rollupCreateReviewTitle">
        <h2>
          <FormattedMessage
            id="xpack.indexLifecycleMgmt.rollup.create.stepReviewTitle"
            defaultMessage="Review details"
          />
        </h2>
      </EuiTitle>
      <EuiSpacer />
      <TabSummary rollupAction={rollupAction} />
    </>
  );
};
