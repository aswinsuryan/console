/* Copyright Contributors to the Open Cluster Management project */

import {
    Card,
    CardActions,
    CardBody,
    CardHeader,
    CardTitle,
    Dropdown,
    DropdownItem,
    DropdownSeparator,
    KebabToggle,
    Stack,
} from '@patternfly/react-core'
import { AcmDrawerContext } from '@stolostron/ui-components'
import { useContext, useState } from 'react'
import { StatusIcons } from '../../../../components/StatusIcons'
import { useTranslation } from '../../../../lib/acm-i18next'
import { deleteResource, PolicySet } from '../../../../resources'
import { PolicySetDetailSidebar } from '../components/PolicySetDetailSidebar'
import { usePolicySetSummary } from '../usePolicySetSummary'

export default function PolicySetCard(props: { policySet: PolicySet; cardIdx: number }) {
    const { policySet, cardIdx } = props
    const { t } = useTranslation()
    const { setDrawerContext } = useContext(AcmDrawerContext)
    const [cardOpenIdx, setCardOpenIdx] = useState<number>()
    const policySetSummary = usePolicySetSummary(policySet)

    function onCardToggle(cardIdx: number) {
        if (cardOpenIdx === cardIdx) {
            setCardOpenIdx(undefined)
        } else setCardOpenIdx(cardIdx)
    }

    const clusterViolationCount = policySetSummary.clusterViolations
    const clusterNonViolationCount = policySetSummary.clusterCount - clusterViolationCount
    const totalClusterCount = policySetSummary.clusterCount
    const policyViolationCount = policySetSummary.policyViolations
    const policyUnknownCount = policySetSummary.policyUnknownStatusCount
    const policyNonViolationCount = policySetSummary.policyCount - policyViolationCount - policyUnknownCount
    const totalPolicyCount = policySetSummary.policyCount

    return (
        <Card
            isRounded
            isLarge
            isHoverable
            isFullHeight
            key={`policyset-${cardIdx}`}
            style={{ transition: 'box-shadow 0.25s', cursor: 'pointer' }}
        >
            <CardHeader isToggleRightAligned={true}>
                <CardActions>
                    <Dropdown
                        toggle={<KebabToggle onToggle={() => onCardToggle(cardIdx)} />}
                        isOpen={cardOpenIdx === cardIdx}
                        isPlain
                        dropdownItems={[
                            <DropdownItem
                                key="view details"
                                onClick={() => {
                                    setDrawerContext({
                                        isExpanded: true,
                                        onCloseClick: () => setDrawerContext(undefined),
                                        panelContent: <PolicySetDetailSidebar policySet={policySet} />,
                                        panelContentProps: { minSize: '50%' },
                                    })
                                }}
                            >
                                {t('View details')}
                            </DropdownItem>,
                            <DropdownItem key="edit" isDisabled>
                                {t('Edit')}
                            </DropdownItem>,
                            <DropdownSeparator key="separator" />,
                            <DropdownItem
                                key="delete"
                                onClick={() => {
                                    deleteResource({
                                        apiVersion: 'policy.open-cluster-management.io/v1',
                                        kind: 'PolicySet',
                                        metadata: {
                                            name: policySet.metadata.name,
                                            namespace: policySet.metadata.namespace,
                                        },
                                    })
                                }}
                            >
                                {t('Delete')}
                            </DropdownItem>,
                        ]}
                        position={'right'}
                    />
                </CardActions>
                <CardTitle>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {policySet.metadata.name}
                        <div style={{ fontSize: 'small', opacity: 0.6 }}>
                            {`Namespace: ${policySet.metadata.namespace}`}
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            {(totalClusterCount || policySet.spec.description) && (
                <CardBody>
                    <Stack hasGutter>
                        <div>{policySet.spec.description}</div>
                        {totalClusterCount > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span>
                                    <strong>{totalClusterCount}</strong> clusters
                                </span>
                                <div style={{ paddingLeft: 16 }}>
                                    <StatusIcons
                                        compliant={clusterNonViolationCount}
                                        violations={clusterViolationCount}
                                    />
                                </div>
                            </div>
                        )}
                        {totalClusterCount > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span>
                                    <strong>{totalPolicyCount}</strong> policies
                                </span>
                                <div style={{ paddingLeft: 16 }}>
                                    <StatusIcons
                                        compliant={policyNonViolationCount}
                                        violations={policyViolationCount}
                                        unknown={policyUnknownCount}
                                    />
                                </div>
                            </div>
                        )}
                    </Stack>
                </CardBody>
            )}
        </Card>
    )
}