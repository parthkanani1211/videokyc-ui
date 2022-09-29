import React, { useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { DataTable } from '../../common';

export default function AuditPage(props) {
    const {
        approvedAudits, pendingAudits, RejectedAudits, 
        fields, sort, auditListPending,
        order, actions: { setSort, setOrder, auditList }
    } = props;

    useEffect(() => {
        auditList();
    }, [auditList]);

    const handleUserEdit = (audit) => {
        props.history.push(`/audit-report/${audit.id}`);
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            Pending Audits
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                fields={fields}
                                data={pendingAudits}
                                onEdit={handleUserEdit}
                                order={order}
                                onOrder={setOrder}
                                sort={sort}
                                onSort={setSort}
                                hasActions={true}
                                loading={auditListPending}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            Approved Audits
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                fields={fields}
                                data={approvedAudits}
                                onEdit={handleUserEdit}
                                order={order}
                                onOrder={setOrder}
                                sort={sort}
                                onSort={setSort}
                                hasActions={true}
                                loading={auditListPending}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            Rejected Audits
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                fields={fields}
                                data={RejectedAudits}
                                onEdit={handleUserEdit}
                                order={order}
                                onOrder={setOrder}
                                sort={sort}
                                onSort={setSort}
                                hasActions={true}
                                loading={auditListPending}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}