import { useProjectIdInUrl } from 'screens/KanBan/util'

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()]
