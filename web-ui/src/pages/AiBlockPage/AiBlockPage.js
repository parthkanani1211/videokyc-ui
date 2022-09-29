import React, { useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { DataTable } from '../../common';

export default function AiBlockPage(props) {
    const {
        aiBlocksFilteredData, fields, sort, aiBlockListPending, aiBlockDeletePending,
        order, actions: { setSort, setOrder, aiBlocksList, aiBlockDelete }
    } = props;

    useEffect(() => {
        aiBlocksList();
    }, [aiBlocksList]);

    const handleAiBlockEdit = (aiBlock) => {
        props.history.push(`/aiBlocks/edit/${aiBlock.id}`);
    }

    const handleCallBack = () => {
        aiBlocksList();
    }

    const handleAiBlockDelete = (aiBlock) => {
        if (aiBlock) {
            aiBlockDelete(aiBlock.id, handleCallBack);
        }
    }

    const handleAddAiBlock = () => {
        props.history.push('/aiBlocks');
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            All AiBlocks
                            <div className="card-header-actions">
                            <Button onClick={handleAddAiBlock} block color="primary">Add AiBlock</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                fields={fields}
                                data={aiBlocksFilteredData}
                                onEdit={handleAiBlockEdit}
                                onDelete={handleAiBlockDelete}
                                order={order}
                                onOrder={setOrder}
                                sort={sort}
                                onSort={setSort}
                                hasActions={true}
                                loading={aiBlockListPending || aiBlockDeletePending}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}