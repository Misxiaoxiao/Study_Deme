import { useCallback, useMemo } from 'react'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'
import { useSearchParams } from 'react-router-dom'

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  const [_, setUrlParams] = useSearchParams()
  const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ])

  // const setUrlParams = useSetUrlSearchParam()
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open =() => setProjectCreate({projectCreate: true})
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" })
  const startEdit = useCallback(
    (id: number) => setEditingProjectId({editingProjectId: id}),
    [setEditingProjectId]
  )

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  } as const
}
