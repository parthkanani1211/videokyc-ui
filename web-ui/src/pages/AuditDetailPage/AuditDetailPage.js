import React from 'react';
import { Card, CardHeader, Col, Row, CardBody } from 'reactstrap';
import {
    Divider,
    Typography,
    List,
    ListItem,
    CircularProgress,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import { CButton } from '../../components';

import { KYC_DOCUMENT_LIST, LOGIN_TYPE } from '../../store/constants/videoKyc';

const AuditDetailPage = ({
    AuditDetailPending,
    AuditDetailData,
    AuditDetailError,
    onApproveClick,
    onRejectClick,
    onSubmitClick,
    loginType,
    onDownloadRecordingClick,
    DownloadPending,
    DownloadError,
}) => {
    const presentAuditDetail = () => {
        return KYC_DOCUMENT_LIST.map((kycListItem) => {
            if (
                AuditDetailData?.kycTypeKYCVerificationDataMap?.[
                kycListItem.type
                ] != null
            ) {
                const kycData =
                    AuditDetailData.kycTypeKYCVerificationDataMap[
                    kycListItem.type
                    ];
                return (
                    <Col xs="12" sm="12" lg="6">

                        <Card>
                            <CardHeader
                                style={{
                                    backgroundColor: 'rgb(32 168 216)',
                                    color: 'white',
                                }}
                            >
                                <b> {kycListItem.label} {loginType}</b>
                            </CardHeader>
                            <Row>
                                <Col xs="12" sm="12" lg="6">
                                    <List>
                                        {kycData.matchResults.map((itemsprop) => (
                                            <ListItem divider>
                                                <div>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="p"
                                                    >
                                                        {itemsprop.name}
                                                    </Typography>
                                                    <Typography component="p">
                                                        {
                                                            itemsprop.value
                                                        }
                                                    </Typography>
                                                </div>
                                            </ListItem>
                                        )
                                        )}
                                    </List>
                                </Col>
                                <Col xs="12" sm="12" lg="6">
                                    {kycData.imageList?.length !== 0 ? (
                                        kycData.imageList.map((itemimages) => (
                                            <div
                                                style={{
                                                    padding: '0px',
                                                }}
                                            >
                                                <img
                                                    alt={kycListItem.type}
                                                    src={
                                                        itemimages.imageData &&
                                                        `data:image;base64,${itemimages.imageData}`
                                                    }
                                                    style={{
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                    }}
                                                />
                                                <Divider />
                                            </div>
                                        ))
                                    ) : (
                                            <div
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <ImageIcon />
                                            No image Found!
                                            </div>
                                        )}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                );
            } else {
                return (
                    <Col xs="12" sm="12" lg="6">
                        <Card>
                            <CardHeader
                                style={{
                                    backgroundColor: 'rgb(32 168 216)',
                                    color: 'white',
                                }}
                            >
                                <b> {kycListItem.label} </b>
                            </CardHeader>
                            <Row style={{ flex: 1, justifyContent: 'center' }}>
                                No Data Found !
                            </Row>
                        </Card>
                    </Col>
                );
            }
        });
    };

    const renderAuditHeader = () => {
        const customerDto = AuditDetailData?.customerInfo?.customerDto;
        const agentDto = AuditDetailData?.agentDto;
        return (
            <Col xs="12" sm="12" lg="12">
                <Row>
                    <Col xs="4" sm="4" lg="4">
                        <div>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Request ID'} : <b>{agentDto?.employeeId}</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Status '} : <b>{AuditDetailData?.status}</b>
                            </Typography>
                        </div>
                    </Col>
                    <Col xs="4" sm="4" lg="4">
                        <div>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Customer Name'} : <b>{`${customerDto?.firstName} ${customerDto?.lastName}`}</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Mobile number'} :{' '}
                                <b>{customerDto?.mobileNumber}</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Location'} :{' '}
                                <b>{AuditDetailData?.customerInfo?.location}</b>
                            </Typography>
                        </div>
                    </Col>
                    <Col xs="4" sm="4" lg="4">
                        <div>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Agent Name'} : <b>{`${agentDto?.firstName} ${agentDto?.lastName}`}</b>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="h2"
                            >
                                {'Mobile number'} :{' '}
                                <b>{agentDto?.mobileNumber}</b>
                            </Typography>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    };

    return (
        <div className="animated fadeIn">
            {AuditDetailPending && !AuditDetailData ? (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <CircularProgress color="secondary" />{' '}
                </div>
            ) : (
                    <Row
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Card>
                            <CardHeader
                                style={{
                                    backgroundColor: 'rgb(32 168 216)',
                                    color: 'white',
                                }}
                            >
                                <b> {'KYC detail'} </b>
                                <div className="pull-right">
                                {DownloadPending && <CircularProgress size={20} color="primary" />} &nbsp;
                                <CButton
                                    color="danger"
                                    disabled={DownloadPending}
                                    onClick={onDownloadRecordingClick}
                                >
                                Download Recording</CButton>
                            {DownloadError && <div className="">Recording not yet available. Please try again later.</div>}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Card body>{renderAuditHeader()} </Card>
                                <Row>{presentAuditDetail()}</Row>
                                <div
                                    style={{
                                        textAlign: 'end',
                                        flex: 1,
                                        marginBottom: '15px',
                                        marginRight: '15px',
                                    }}
                                >
                                    {loginType === LOGIN_TYPE.AGENT && (
                                        <CButton
                                            color="primary"
                                            onClick={onSubmitClick}
                                        >
                                            Submit
                                        </CButton>
                                    )}
                                    {loginType === LOGIN_TYPE.AUDITOR && (
                                        <>
                                            <CButton
                                                variant="ghost"
                                                color="danger"
                                                onClick={onRejectClick}
                                            >
                                                Reject
                                            </CButton>
                                            {'  '}
                                            <CButton
                                                color="primary"
                                                onClick={onApproveClick}
                                            >
                                                Approve
                                            </CButton>
                                        </>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                )}
        </div>
    );
};

export default AuditDetailPage;
