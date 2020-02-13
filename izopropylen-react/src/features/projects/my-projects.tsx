import React, { useCallback } from 'react'
import { ProjectMembership } from 'models'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Spinner, Row, Col, Button, Alert } from 'react-bootstrap'

import { selectMemberships, selectIsLoading, selectFetchProjectsErrorMessage, selectCreateProjectsErrorMessage, selectIsDialogOpen } from './selectors'
import { MainLayout } from '../../common/main-layout'
import { fetchProjects, createProject, toggleDialog } from './actions'
import { Link } from 'react-router-dom'
import { CreateProjectModal } from './create-project-modal'

export const MyProjects = () => {
    const dispatch = useDispatch()

    const memberships = useSelector(selectMemberships)
    const loading = useSelector(selectIsLoading)
    const fetchProjectsError = useSelector(selectFetchProjectsErrorMessage)
    const createProjectError = useSelector(selectCreateProjectsErrorMessage)
    const dialogOpen = useSelector(selectIsDialogOpen)

    const createProjectCb = useCallback((name: string) => dispatch(createProject.request({ name })), [dispatch])
    const closeDialogCb = useCallback(() => dispatch(toggleDialog({open: false})), [dispatch])
    const openDialogCb = useCallback(() => dispatch(toggleDialog({open: true})), [dispatch])

    React.useEffect(() => {
        dispatch(fetchProjects.request())
    }, [dispatch])

    return <MainLayout>
        <CreateProjectModal
            show={dialogOpen}
            loading={loading}
            errorMessage={createProjectError}
            onSubmit={createProjectCb}
            onClose={closeDialogCb}
        />
        <Button className='m-2' variant='primary' onClick={openDialogCb}>Create project &#43;</Button>
        <Row>
            <Col xs={12}>
                {fetchProjectsError && <Alert variant='danger'>{fetchProjectsError}</Alert>}
                {!memberships && <Spinner animation='border' />}
                {memberships?.length === 0 && 'You have no projects, create one!'}
                {memberships && memberships.map(m => <ProjectMembershipItem key={m.projectId} item={m} />)}
            </Col>
        </Row>
    </MainLayout>
}

interface ProjectMembershipItemProps {
    item: ProjectMembership
}

const ProjectMembershipItem = React.memo<ProjectMembershipItemProps>(
    ({ item }) => <Card>
        <Card.Body>
            <Row className='justify-content-between'>
                <Col xs='auto'>
                    <Link to={`/projects/${item.projectId}`}>
                        <strong>{item.name}</strong>
                    </Link>
                    &nbsp;as {item.role}
                </Col>
                <Col xs='auto'>
                    <Link to={`/projects/${item.projectId}`}>Detail</Link>
                </Col>
            </Row>
        </Card.Body>
    </Card>
)
