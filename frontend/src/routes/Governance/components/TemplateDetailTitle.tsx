/* Copyright Contributors to the Open Cluster Management project */

import { Label, Tooltip } from '@patternfly/react-core'
import { AsleepIcon, CheckCircleIcon, ExclamationCircleIcon } from '@patternfly/react-icons'
import { useMemo } from 'react'
import { useTranslation } from '../../../lib/acm-i18next'

export function TemplateDetailTitle({
  policyKind,
  templateName,
  compliant,
}: Readonly<{ policyKind?: string; templateName: string; compliant: string }>) {
  const { t } = useTranslation()

  const short = useMemo(() => {
    let newStr = ''
    if (policyKind) {
      for (const element of policyKind) {
        if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(element)) {
          newStr += element
        }
      }
    }

    if (newStr == '') {
      return ''
    }

    return (
      <Tooltip content={policyKind}>
        <span
          style={{
            padding: '1px 4px',
            backgroundColor: '#009596',
            color: 'var(--pf-global--BackgroundColor--light-100)',
            borderRadius: '20px',
            fontSize: '0.75rem',
            marginRight: '10px',
          }}
        >
          {newStr}
        </span>
      </Tooltip>
    )
  }, [policyKind])

  const badgeCompliant = useMemo(() => {
    switch (compliant) {
      case 'NonCompliant':
        return (
          <Label color="red" icon={<ExclamationCircleIcon />} style={{ verticalAlign: 'middle' }}>
            {t('Violations')}
          </Label>
        )
      case 'Compliant':
        return (
          <Label color="green" icon={<CheckCircleIcon />} style={{ verticalAlign: 'middle' }}>
            {t('No violations')}
          </Label>
        )
      case 'Terminating':
        return (
          <Label color="purple" icon={<AsleepIcon />} style={{ verticalAlign: 'middle' }}>
            {t('Terminating')}
          </Label>
        )
      default:
        return ''
    }
  }, [compliant, t])

  return (
    <>
      {short}
      <span style={{ marginRight: '10px' }}>{templateName}</span>
      {badgeCompliant}
    </>
  )
}
