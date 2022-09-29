import React, { useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { DataTable } from '../../common';
import {list as roleList} from "../../store/actions/roles";

export default function UsersPage(props) {
    const {
        usersFilteredData, fields, sort, userListPending, userDeletePending,
        order, actions: { setSort, setOrder, usersList, userDelete, userCreateStart, userUpdateStart, roleList }
    } = props;

    useEffect(() => {
        usersList();
    }, [usersList]);
    
    useEffect(() => {
        roleList();
    },[roleList]);

    const handleUserEdit = (user) => {
        props.history.push(`users/edit/${user.id}`);
        userUpdateStart();
    }

    const handleCallBack = () => {
        usersList();
    }

    const handleUserDelete = (user) => {
        if (user) {
            userDelete(user.id, handleCallBack);
        }
    }

    const handleAddUser = () => {
        props.history.push('users/new');
        userCreateStart();
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardHeader>
                            All Users
                            <div className="card-header-actions">
                            <Button onClick={handleAddUser} block color="primary">Add User</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                fields={fields}
                                data={usersFilteredData}
                                onEdit={handleUserEdit}
                                onDelete={handleUserDelete}
                                order={order}
                                onOrder={setOrder}
                                sort={sort}
                                onSort={setSort}
                                hasActions={true}
                                loading={userListPending || userDeletePending}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
