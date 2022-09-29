import React, { Component, lazy } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, Col, Progress, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltipsV2';
import { getStyle } from '@coreui/coreuiV2/dist/js/coreui-utilities';

import { saveOrganizationId } from '../../router/RouterHelpers';
import { getQuery } from '../../util/routing';

import Widget04 from '../../views/Widgets/Widget04';
import Widget02 from '../../views/Widgets/Widget02';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary');
// const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info');
const brandDanger = getStyle('--danger');

// Card Chart 1
const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandPrimary,
            borderColor: 'rgba(255,255,255,.55)',
            data: [65, 59, 84, 84, 51, 55, 40],
        },
    ],
};

const cardChartOpts1 = {
    tooltips: {
        enabled: false,
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },
            },
        ],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min:
                        Math.min.apply(Math, cardChartData1.datasets[0].data) -
                        5,
                    max:
                        Math.max.apply(Math, cardChartData1.datasets[0].data) +
                        5,
                },
            },
        ],
    },
    elements: {
        line: {
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 2
const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11],
        },
    ],
};

const cardChartDataLoss = {
    labels: [100, 80, 60, 40, 20, 10, 0],
    datasets: [
        {
            label: 'Error',
            backgroundColor: '#f9dcdf',
            borderColor: '#dc3545',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [80, 70, 60, 40, 20, 10, 0],
        },
    ],
};

const cardChartDataSaving = {
    labels: [0, 20, 30, 50, 60, 80, 90, 100],
    datasets: [
        {
            label: 'Savings',
            backgroundColor: '#e8faec',
            borderColor: '#28a745',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [0, 20, 30, 50, 60, 70, 80, 90],
        },
    ],
};

const cardChartOpts2 = {
    tooltips: {
        enabled: false,
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },
            },
        ],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min:
                        Math.min.apply(Math, cardChartData2.datasets[0].data) -
                        5,
                    max:
                        Math.max.apply(Math, cardChartData2.datasets[0].data) +
                        5,
                },
            },
        ],
    },
    elements: {
        line: {
            tension: 0.00001,
            borderWidth: 1,
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

const cardChartOptsLoss = {
    tooltips: {
        enabled: false,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
            labelColor: function (tooltipItem, chart) {
                return {
                    backgroundColor:
                        chart.data.datasets[tooltipItem.datasetIndex]
                            .borderColor,
                };
            },
        },
    },
    maintainAspectRatio: true,
    legend: {
        display: true,
    },
    scales: {
        xAxes: [
            {
                ticks: {
                    display: false,
                },
                gridLines: {
                    drawOnChartArea: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'No of Errors',
                },
            },
        ],
        yAxes: [
            {
                ticks: {
                    display: false,
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(100 / 5),
                    max: 100,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                },
            },
        ],
    },
    elements: {
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        },
    },
};

const cardChartOptsSavings = {
    tooltips: {
        enabled: false,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
            labelColor: function (tooltipItem, chart) {
                return {
                    backgroundColor:
                        chart.data.datasets[tooltipItem.datasetIndex]
                            .borderColor,
                };
            },
        },
    },
    maintainAspectRatio: true,
    legend: {
        display: true,
    },
    scales: {
        xAxes: [
            {
                ticks: {
                    display: false,
                },
                gridLines: {
                    drawOnChartArea: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Value',
                },
            },
        ],
        yAxes: [
            {
                ticks: {
                    display: false,
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(100 / 5),
                    max: 100,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                },
            },
        ],
    },
    elements: {
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        },
    },
};

// Card Chart 3
const cardChartData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40],
        },
    ],
};

const cardChartOpts3 = {
    tooltips: {
        enabled: false,
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
            },
        ],
        yAxes: [
            {
                display: false,
            },
        ],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
};

// Card Chart 4
const cardChartData4 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: [
                78,
                81,
                80,
                45,
                34,
                12,
                40,
                75,
                34,
                89,
                32,
                68,
                54,
                72,
                18,
                98,
            ],
        },
    ],
};

const cardChartOpts4 = {
    tooltips: {
        enabled: false,
    },
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
                barPercentage: 0.6,
            },
        ],
        yAxes: [
            {
                display: false,
            },
        ],
    },
};

// sparkline charts
const sparkLineChartData = [
    {
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'New Clients',
    },
    {
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Recurring Clients',
    },
    {
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Pageviews',
    },
    {
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Organic',
    },
    {
        data: [78, 81, 80, 45, 34, 12, 40],
        label: 'CTR',
    },
    {
        data: [1, 13, 9, 17, 34, 41, 38],
        label: 'Bounce Rate',
    },
];

const makeSparkLineData = (dataSetNo, variant) => {
    const dataset = sparkLineChartData[dataSetNo];
    const data = {
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: variant ? variant : '#c2cfd6',
                data: dataset.data,
                label: dataset.label,
            },
        ],
    };
    return () => data;
};

const sparklineChartOpts = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips,
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [
            {
                display: false,
            },
        ],
        yAxes: [
            {
                display: false,
            },
        ],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        },
    },
    legend: {
        display: false,
    },
};

// Main Chart

//Random Numbers
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
    data1.push(random(50, 200));
    data2.push(random(80, 100));
    data3.push(65);
}

class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
        };
    }

    componentDidMount() {
        const { history, location } = this.props;
        const query = getQuery(location);
        const orgId = query.get('orgId');

        if (orgId) {
            saveOrganizationId(parseInt(orgId));
            history.replace('/dashboard');
        }
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected,
        });
    }

    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <h1>67%</h1>
                                </div>
                                <div>
                                    <h5>Reduction CTC</h5>
                                </div>
                            </CardBody>
                            <div
                                className="chart-wrapper mx-3"
                                style={{ height: '50px' }}
                            >
                                <Line
                                    data={cardChartData2}
                                    options={cardChartOpts2}
                                    height={50}
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-danger">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <h1>95%</h1>
                                </div>
                                <div>
                                    <h5>Error Reduction</h5>
                                </div>
                            </CardBody>
                            <div
                                className="chart-wrapper mx-3"
                                style={{ height: '50px' }}
                            >
                                <Line
                                    data={cardChartData3}
                                    options={cardChartOpts3}
                                    height={50}
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-warning">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <h1>70%</h1>
                                </div>
                                <div>
                                    <h5>Cost Savings</h5>
                                </div>
                            </CardBody>
                            <div
                                className="chart-wrapper"
                                style={{ height: '50px' }}
                            >
                                <Line
                                    data={cardChartData1}
                                    options={cardChartOpts1}
                                    height={50}
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <div className="text-value">
                                    <h1>150</h1>
                                </div>
                                <div>
                                    <h5>Bots in Work</h5>
                                </div>
                            </CardBody>
                            <div
                                className="chart-wrapper mx-3"
                                style={{ height: '50px' }}
                            >
                                <Bar
                                    data={cardChartData4}
                                    options={cardChartOpts4}
                                    height={50}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardHeader>Bots AI</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="5" sm="5" lg="5">
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    RPA + AiBlock
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    80
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="success"
                                                    value="80"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    DOCUMENT AI
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    20
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="warning"
                                                    value="20"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    VIDEO AI
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    20
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="success"
                                                    value="40"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    CONNECTORS
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    30
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="info"
                                                    value="56"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="7" sm="7" lg="7">
                                        <Row>
                                            <Col xs="6" sm="6" lg="6">
                                                <Line
                                                    data={cardChartDataLoss}
                                                    options={cardChartOptsLoss}
                                                    height={200}
                                                />
                                            </Col>
                                            <Col xs="6" sm="6" lg="6">
                                                <Line
                                                    data={cardChartDataSaving}
                                                    options={
                                                        cardChartOptsSavings
                                                    }
                                                    height={200}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardHeader>
                                DOCUMENT AI (RPA + VISION AI + Language AI +
                                AiBlock)
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="2" sm="2" lg="2">
                                        <Widget04 header="Languages">
                                            <h2>5</h2>
                                        </Widget04>
                                    </Col>
                                    <Col xs="2" sm="2" lg="2">
                                        <Widget04 header="Domains">
                                            <h2>20</h2>
                                        </Widget04>
                                    </Col>
                                    <Col xs="3" sm="3" lg="3">
                                        <Widget04 header="Documents/Daily">
                                            <h2>200k</h2>
                                        </Widget04>
                                    </Col>
                                    <Col xs="2" sm="2" lg="2">
                                        <Widget04 header="STP">
                                            <h2>90%</h2>
                                        </Widget04>
                                    </Col>
                                    <Col xs="3" sm="3" lg="3">
                                        <Widget04 header="CTC">
                                            <Row noGutters>
                                                <Col xs="5" sm="5" lg="5">
                                                    <h2>80%</h2>
                                                </Col>
                                                <Col xs="4" sm="4" lg="4">
                                                    <i
                                                        style={{
                                                            color: '#dc3545',
                                                        }}
                                                        className="icon-arrow-down-circle icons font-2xl d-block mt-2"
                                                    ></i>
                                                </Col>
                                            </Row>
                                        </Widget04>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="6" lg="6">
                        <Card>
                            <CardHeader>INVOICES</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="4" sm="4" lg="4">
                                        <div className="callout callout-info">
                                            <small className="text-muted">
                                                Vendors
                                            </small>
                                            <br />
                                            <strong className="h1">500</strong>
                                        </div>
                                    </Col>
                                    <Col xs="4" sm="4" lg="4">
                                        <div className="callout callout-warning">
                                            <small className="text-muted">
                                                Invoices/monthly
                                            </small>
                                            <br />
                                            <strong className="h1">100k</strong>
                                        </div>
                                    </Col>
                                    <Col xs="4" sm="4" lg="4">
                                        <div className="callout callout-success">
                                            <small className="text-muted">
                                                STP
                                            </small>
                                            <br />
                                            <strong className="h1">90%</strong>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4" sm="4" lg="4">
                                        <div className="callout callout-warning">
                                            <small className="text-muted">
                                                Human Intervention
                                            </small>
                                            <br />
                                            <strong className="h1">290</strong>
                                        </div>
                                    </Col>
                                    <Col xs="4" sm="4" lg="4">
                                        <div className="callout callout-success">
                                            <small className="text-muted">
                                                Times faster
                                            </small>
                                            <br />
                                            <strong className="h1">80</strong>
                                        </div>
                                    </Col>
                                    <Col xs="4" sm="4" lg="4">
                                        <div className="callout callout-info">
                                            <small className="text-muted">
                                                Avg. Cost
                                            </small>
                                            <br />
                                            <strong className="h1">
                                                $0.05
                                            </strong>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" lg="6">
                                        <div className="callout callout-danger">
                                            <small className="text-muted">
                                                Oracle
                                            </small>
                                            <br />
                                            <strong className="h3">
                                                ERP Connector
                                            </strong>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="6" sm="6" lg="6">
                        <Card>
                            <CardHeader>BFSI - KYC</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    KYC/MONTH
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    12000
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="success"
                                                    value="70"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    HUMAN INTERVENTION
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    100
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="danger"
                                                    value="10"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    PROOF OF IDENTIFICATION
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    10+
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="warning"
                                                    value="40"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    STP
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    98%
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="success"
                                                    value="90"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    PROOF OF ADDRESS
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    20+
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="warning"
                                                    value="30"
                                                />
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    AVG. COST
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    $0.005/KYC
                                                </span>
                                            </div>
                                            <div className="progress-group-bars">
                                                <Progress
                                                    className="progress-xs"
                                                    color="info"
                                                    value="10"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Video AI</CardHeader>
                            <CardBody>
                                <Row>
                                    {/* <Col xs="3" sm="3" lg="3">
                    <h2>Financial Services</h2>
                  </Col> */}
                                    <Col xs="3" sm="3" lg="3">
                                        <Widget02
                                            header="200 Mins"
                                            mainText="Month"
                                            icon="fa fa-calendar"
                                            color="info"
                                            variant="1"
                                        />
                                    </Col>
                                    <Col xs="3" sm="3" lg="3">
                                        <Widget02
                                            header="20"
                                            mainText="Agents"
                                            icon="fa fa-user"
                                            color="success"
                                            variant="1"
                                        />
                                    </Col>
                                    <Col xs="3" sm="3" lg="3">
                                        <Widget02
                                            header="10000"
                                            mainText="Customers"
                                            icon="fa fa-users"
                                            color="warning"
                                            variant="1"
                                        />
                                    </Col>
                                    <Col xs="3" sm="3" lg="3">
                                        <Widget02
                                            header="80%"
                                            mainText="Cost"
                                            icon="fa fa-arrow-down"
                                            color="danger"
                                            variant="1"
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" sm="6" lg="6">
                        <Card>
                            <CardHeader>VIDEO KYC</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <Widget03
                                            dataBox={() => ({
                                                variant: 'facebook',
                                                'KYC/MONTH': '5000',
                                                'AVG COST': '$0.10',
                                            })}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" lg="6">
                                        <Widget03
                                            dataBox={() => ({
                                                variant: 'facebook',
                                                'AI AUTOMATED DESIGN MAKING':
                                                    '96%',
                                                'HUMAN INTERVENTION': '4%',
                                            })}
                                        />
                                    </Col>
                                    <Col xs="6" sm="6" lg="6">
                                        <Widget03
                                            dataBox={() => ({
                                                variant: 'facebook',
                                                SECURE: '100%',
                                                'CUSTOMER DATA': 'SECURED',
                                            })}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="6" sm="6" lg="6">
                        <Card>
                            <CardHeader>LOAN/INSURANCE ADVISORY</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <Widget03
                                            dataBox={() => ({
                                                variant: 'facebook',
                                                'ADVISORY/MONTH': '100K',
                                                'AVG COST': '$0.20',
                                            })}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" lg="6">
                                        <Widget03
                                            dataBox={() => ({
                                                variant: 'facebook',
                                                'AI AUTOMATED': '96%',
                                                SECURE: '100%',
                                            })}
                                        />
                                    </Col>
                                    <Col xs="6" sm="6" lg="6">
                                        <Widget03
                                            dataBox={() => ({
                                                variant: 'facebook',
                                                'DIFFERENT TYPES': '80',
                                                'TIMES FASTER': '200',
                                            })}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Connectors AI</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6" md="6" xl="6">
                                        <Row>
                                            <Col sm="6">
                                                <div className="callout callout-info">
                                                    <small className="text-muted">
                                                        ORACLE
                                                    </small>
                                                    <br />
                                                    <strong className="h2">
                                                        5
                                                    </strong>
                                                    <div className="chart-wrapper">
                                                        <Line
                                                            data={makeSparkLineData(
                                                                1,
                                                                brandDanger
                                                            )}
                                                            options={
                                                                sparklineChartOpts
                                                            }
                                                            width={100}
                                                            height={30}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div className="callout callout-danger">
                                                    <small className="text-muted">
                                                        CUSTOM APIN
                                                    </small>
                                                    <br />
                                                    <strong className="h2">
                                                        10
                                                    </strong>
                                                    <div className="chart-wrapper">
                                                        <Line
                                                            data={makeSparkLineData(
                                                                1,
                                                                brandDanger
                                                            )}
                                                            options={
                                                                sparklineChartOpts
                                                            }
                                                            width={100}
                                                            height={30}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="1" md="1" xl="1"></Col>
                                    <Col xs="4" md="4" xl="4">
                                        <h5 className="text-muted">Status</h5>
                                        <hr className="mt-0" />
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    ORACLE
                                                </span>
                                                <span className="ml-auto font-weight-bold">
                                                    CONNECTED
                                                </span>
                                                <i className="fa fa-check progress-group-icon text-success"></i>
                                            </div>
                                        </div>
                                        <div className="progress-group">
                                            <div className="progress-group-header">
                                                <span className="title">
                                                    HTTP
                                                </span>
                                                <span className="ml-auto font-weight-bold"></span>
                                                <i className="fa fa-check progress-group-icon text-success"></i>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardPage;
