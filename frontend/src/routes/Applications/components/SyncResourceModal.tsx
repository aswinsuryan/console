/* Copyright Contributors to the Open Cluster Management project */

import { AcmModal, AcmToastContext } from '@stolostron/ui-components'
import { Button, ModalVariant } from '@patternfly/react-core'
import { TFunction } from 'i18next'
import { IResource, reconcileResources } from '../../../resources'
import _ from 'lodash'
import { useContext } from 'react'
export interface ISyncResourceModalProps {
    close: () => void
    open: boolean
    resources: IResource[]
    t: TFunction
}

export function SyncResourceModal(props: ISyncResourceModalProps | { open: false }) {
    if (props.open === false) {
        return <></>
    }
    const { t } = props
    const toastContext = useContext(AcmToastContext)

    const handleSubmit = () => {
        props.close()
        const existingResources = props.resources
        const subNames: (string | undefined)[] = []
        props.resources.forEach((sub) => {
            subNames.push(sub.metadata?.name)
            const annotations = _.get(sub, 'metadata.annotations', {})
            annotations['apps.open-cluster-management.io/manual-refresh-time'] = new Date()
        })

        reconcileResources(props.resources, existingResources).then(() => {
            toastContext.addAlert({
                title: t('Subscription updated'),
                message: t(`${subNames.join(', ')} were successfully synced.`),
                type: 'success',
                autoClose: true,
            })
        })
    }

    const modalTitle = t('Sync application')
    return (
        <AcmModal
            id="remove-resource-modal"
            isOpen={props.open}
            title={modalTitle}
            aria-label={modalTitle}
            showClose={true}
            onClose={props.close}
            variant={ModalVariant.large}
            position="top"
            positionOffset="225px"
            actions={[
                <Button key="confirm" variant="primary" onClick={() => handleSubmit()}>
                    {t('Synchronize')}
                </Button>,
                <Button key="cancel" variant="link" onClick={props.close}>
                    {t('Cancel')}
                </Button>,
            ]}
        >
            {t('Synchronize application resources with the source repository.')}
        </AcmModal>
    )
}
