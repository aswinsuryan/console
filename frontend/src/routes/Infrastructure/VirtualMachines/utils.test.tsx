/* Copyright Contributors to the Open Cluster Management project */

import i18next from 'i18next'
import { getVirtualMachineRowActions } from './utils'

const mockHistoryPush = jest.fn()
describe('VirtualMachines utils', () => {
  jest.mock('react-router-dom-v5-compat', () => ({
    ...jest.requireActual('react-router-dom-v5-compat'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }))
  const t = i18next.t.bind(i18next)
  const navigate = jest.fn()
  const toastContextMock: any = {
    addAlert: jest.fn(),
  }
  jest.mock('../../Search/SearchResults/utils', () => ({
    handleVMActions: jest.fn(() => {
      return Promise.resolve()
    }), // Mock VM actions function
  }))

  it('should return actions for VM with enabled actions and status "Running"', () => {
    const item = {
      _specRunning: 'true',
      _uid: 'bare-metal/4d2cd231-0794-4a4b-89a3-90bb8b6ea89b',
      apigroup: 'kubevirt.io',
      apiversion: 'v1',
      cluster: 'bare-metal',
      cpu: '1',
      created: '2024-10-02T20:02:14Z',
      kind: 'VirtualMachine',
      kind_plural: 'virtualmachines',
      label:
        'app=centos9-01; kubevirt.io/dynamic-credentials-support=true; vm.kubevirt.io/template=centos-stream9-server-small; vm.kubevirt.io/template.namespace=openshift; vm.kubevirt.io/template.revision=1; vm.kubevirt.io/template.version=v0.29.2',
      memory: '2Gi',
      name: 'centos9-01',
      namespace: 'openshift-cnv',
      ready: 'True',
      status: 'Running',
    }
    const result = getVirtualMachineRowActions(
      item,
      [],
      () => {},
      () => {},
      true,
      toastContextMock,
      navigate,
      t
    )

    // Assert the correct number of actions are returned
    expect(result).toHaveLength(6)

    expect(result[0].isDisabled).toBe(false) // stop
    expect(result[1].isDisabled).toBe(false) // restart
    expect(result[2].isDisabled).toBe(false) // pause

    // Check if the correct click handler is set for actions
    const stopVMAction = result.find((action) => action.id === 'stopVM')
    const restartVMAction = result.find((action) => action.id === 'restartVM')
    const pauseVMAction = result.find((action) => action.id === 'pauseVM')
    const editVM = result.find((action) => action.id === 'edit')
    const viewVMRelatedRes = result.find((action) => action.id === 'view-related')
    const deleteVM = result.find((action) => action.id === 'delete')

    stopVMAction?.click(item)
    restartVMAction?.click(item)
    pauseVMAction?.click(item)
    editVM?.click(item)
    viewVMRelatedRes?.click(item)
    deleteVM?.click(item)
  })

  it('should return actions for hub cluster VM with enabled actions and status "Running"', () => {
    const item = {
      _hubClusterResource: 'true',
      _specRunning: 'true',
      _uid: 'bare-metal/4d2cd231-0794-4a4b-89a3-90bb8b6ea89b',
      apigroup: 'kubevirt.io',
      apiversion: 'v1',
      cluster: 'bare-metal',
      cpu: '1',
      created: '2024-10-02T20:02:14Z',
      kind: 'VirtualMachine',
      kind_plural: 'virtualmachines',
      label:
        'app=centos9-01; kubevirt.io/dynamic-credentials-support=true; vm.kubevirt.io/template=centos-stream9-server-small; vm.kubevirt.io/template.namespace=openshift; vm.kubevirt.io/template.revision=1; vm.kubevirt.io/template.version=v0.29.2',
      memory: '2Gi',
      name: 'centos9-01',
      namespace: 'openshift-cnv',
      ready: 'True',
      status: 'Running',
    }
    const result = getVirtualMachineRowActions(
      item,
      [],
      () => {},
      () => {},
      true,
      toastContextMock,
      navigate,
      t
    )

    // Assert the correct number of actions are returned
    expect(result).toHaveLength(6)

    expect(result[0].isDisabled).toBe(false) // stop
    expect(result[1].isDisabled).toBe(false) // restart
    expect(result[2].isDisabled).toBe(false) // pause

    // Check if the correct click handler is set for actions
    const stopVMAction = result.find((action) => action.id === 'stopVM')
    const restartVMAction = result.find((action) => action.id === 'restartVM')
    const pauseVMAction = result.find((action) => action.id === 'pauseVM')
    const editVM = result.find((action) => action.id === 'edit')
    const viewVMRelatedRes = result.find((action) => action.id === 'view-related')
    const deleteVM = result.find((action) => action.id === 'delete')

    stopVMAction?.click(item)
    restartVMAction?.click(item)
    pauseVMAction?.click(item)
    editVM?.click(item)
    viewVMRelatedRes?.click(item)
    deleteVM?.click(item)
  })

  it('should return actions for VM with enabled actions and status "Stopped"', () => {
    const item = {
      _specRunning: 'true',
      _uid: 'bare-metal/4d2cd231-0794-4a4b-89a3-90bb8b6ea89b',
      apigroup: 'kubevirt.io',
      apiversion: 'v1',
      cluster: 'bare-metal',
      cpu: '1',
      created: '2024-10-02T20:02:14Z',
      kind: 'VirtualMachine',
      kind_plural: 'virtualmachines',
      label:
        'app=centos9-01; kubevirt.io/dynamic-credentials-support=true; vm.kubevirt.io/template=centos-stream9-server-small; vm.kubevirt.io/template.namespace=openshift; vm.kubevirt.io/template.revision=1; vm.kubevirt.io/template.version=v0.29.2',
      memory: '2Gi',
      name: 'centos9-01',
      namespace: 'openshift-cnv',
      ready: 'True',
      status: 'Stopped',
    }
    const result = getVirtualMachineRowActions(
      item,
      [],
      () => {},
      () => {},
      true,
      toastContextMock,
      navigate,
      t
    )

    // Assert the correct number of actions are returned
    expect(result).toHaveLength(6)

    expect(result[0].isDisabled).toBe(false) // start
    expect(result[1].isDisabled).toBe(true) // restart
    expect(result[2].isDisabled).toBe(true) // pause

    // Check if the correct click handler is set for actions
    const startVMAction = result.find((action) => action.id === 'startVM')
    const restartVMAction = result.find((action) => action.id === 'restartVM')
    const pauseVMAction = result.find((action) => action.id === 'pauseVM')
    const editVM = result.find((action) => action.id === 'edit')
    const viewVMRelatedRes = result.find((action) => action.id === 'view-related')
    const deleteVM = result.find((action) => action.id === 'delete')

    startVMAction?.click(item)
    restartVMAction?.click(item)
    pauseVMAction?.click(item)
    editVM?.click(item)
    viewVMRelatedRes?.click(item)
    deleteVM?.click(item)
  })

  it('should return actions for VM with enabled actions and status "Paused"', () => {
    const item = {
      _specRunning: 'true',
      _uid: 'bare-metal/4d2cd231-0794-4a4b-89a3-90bb8b6ea89b',
      apigroup: 'kubevirt.io',
      apiversion: 'v1',
      cluster: 'bare-metal',
      cpu: '1',
      created: '2024-10-02T20:02:14Z',
      kind: 'VirtualMachine',
      kind_plural: 'virtualmachines',
      label:
        'app=centos9-01; kubevirt.io/dynamic-credentials-support=true; vm.kubevirt.io/template=centos-stream9-server-small; vm.kubevirt.io/template.namespace=openshift; vm.kubevirt.io/template.revision=1; vm.kubevirt.io/template.version=v0.29.2',
      memory: '2Gi',
      name: 'centos9-01',
      namespace: 'openshift-cnv',
      ready: 'True',
      status: 'Paused',
    }
    const result = getVirtualMachineRowActions(
      item,
      [],
      () => {},
      () => {},
      true,
      toastContextMock,
      navigate,
      t
    )

    // Assert the correct number of actions are returned
    expect(result).toHaveLength(6)

    expect(result[0].isDisabled).toBe(false) // start
    expect(result[1].isDisabled).toBe(false) // restart
    expect(result[2].isDisabled).toBe(false) // unpause

    // Check if the correct click handler is set for actions
    const startVMAction = result.find((action) => action.id === 'startVM')
    const restartVMAction = result.find((action) => action.id === 'restartVM')
    const unpauseVMAction = result.find((action) => action.id === 'unpauseVM')
    const editVM = result.find((action) => action.id === 'edit')
    const viewVMRelatedRes = result.find((action) => action.id === 'view-related')
    const deleteVM = result.find((action) => action.id === 'delete')

    startVMAction?.click(item)
    restartVMAction?.click(item)
    unpauseVMAction?.click(item)
    editVM?.click(item)
    viewVMRelatedRes?.click(item)
    deleteVM?.click(item)
  })

  it('should return actions for VM with VM actions disabled', () => {
    const item = {
      _specRunning: 'true',
      _uid: 'bare-metal/4d2cd231-0794-4a4b-89a3-90bb8b6ea89b',
      apigroup: 'kubevirt.io',
      apiversion: 'v1',
      cluster: 'bare-metal',
      cpu: '1',
      created: '2024-10-02T20:02:14Z',
      kind: 'VirtualMachine',
      kind_plural: 'virtualmachines',
      label:
        'app=centos9-01; kubevirt.io/dynamic-credentials-support=true; vm.kubevirt.io/template=centos-stream9-server-small; vm.kubevirt.io/template.namespace=openshift; vm.kubevirt.io/template.revision=1; vm.kubevirt.io/template.version=v0.29.2',
      memory: '2Gi',
      name: 'centos9-01',
      namespace: 'openshift-cnv',
      ready: 'True',
      status: 'Stopped',
    }
    const result = getVirtualMachineRowActions(
      item,
      [],
      () => {},
      () => {},
      false,
      toastContextMock,
      navigate,
      t
    )

    // Assert the correct number of actions are returned
    expect(result).toHaveLength(3)
  })
})