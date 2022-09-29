import React, { useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { DataTable } from '../../common';

export default function WorkflowPage(props) {
    const {
        workflowsFilteredData, fields, sort, workflowListPending, workflowDeletePending,
        order, actions: { setSort, setOrder, workflowsList, workflowDelete }
    } = props;

    useEffect(() => {
        workflowsList();
    }, [workflowsList]);

    const handleWorkflowEdit = (workflow) => {
        props.history.push(`/workflows/edit/${workflow.id}`);
    }

    const handleCallBack = () => {
        workflowsList();
    }

    const handleWorkflowDelete = (workflow) => {
        if (workflow) {
            workflowDelete(workflow.id, handleCallBack);
        }
    }

    const handleAddWorkflow = () => {
        props.history.push('/workflows/edit/new');
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            All Workflows
                            <div className="card-header-actions">
                            <Button 
                                onClick={handleAddWorkflow} 
                                block 
                                color="primary"
                            >Add Workflow</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                fields={fields}
                                data={workflowsFilteredData}
                                onEdit={handleWorkflowEdit}
                                onDelete={handleWorkflowDelete}
                                order={order}
                                onOrder={setOrder}
                                sort={sort}
                                onSort={setSort}
                                hasActions={true}
                                loading={workflowListPending || workflowDeletePending}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}