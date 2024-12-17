import React, { useEffect, useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Spin,
} from "antd";
import "./GetEstimate.css";
import useStore from "../../../../app/store";

const { Title, Text, Link } = Typography;

const GetEstimate = () => {
  const [koiCounts, setKoiCounts] = useState({});
  const [showCard, setShowCard] = useState(false);
  const [estimate, setEstimate] = useState({ boxes: {}, cost: 0 });
  const koiSizeList = useStore((state) => state.koiSizeList) || [];
  const getAllKoiSize = useStore((state) => state.getAllKoiSize);
  const isLoading = useStore((state) => state.isLoading);
  const koiSizes = Array.isArray(koiSizeList) ? koiSizeList : [];
  const getCreateOrderFish = useStore((state) => state.getCreateOrderFish);

  useEffect(() => {
    getAllKoiSize();
  }, [getAllKoiSize]);

  const handleSubmit = async () => {
    const requestBody = {
      orderId: 1,
      orderItemDetails: koiSizes.map((size) => ({
        koiSizeId: size.koiSizeId,
        quantity: koiCounts[size.koiSizeId] || 0,
      })),
    };

    console.log("Body request:", requestBody);

    await getCreateOrderFish(requestBody);
  };

  const columns = [
    {
      title: "Size in CM",
      dataIndex: "sizeCM",
      key: "sizeCM",
      className: "table-header",
    },
    {
      title: "Size in Inch",
      dataIndex: "sizeInch",
      key: "sizeInch",
      className: "table-header",
    },
    {
      title: "# of KOI",
      dataIndex: "key",
      key: "input",
      render: (key) => {
        const size = koiSizes.find((size) => size.id === key);
        if (!size) return null;

        return (
          <InputNumber
            className="koi-input"
            min={0} // Không cho phép số âm
            onChange={(value) => {
              const safeValue = value < 0 ? 0 : value; // Kiểm tra giá trị nhập vào
              setKoiCounts((prev) => ({
                ...prev,
                [size.id]: safeValue || 0,
              }));
            }}
            placeholder="0"
            value={koiCounts[size.id] || 0}
          />
        );
      },
    },
  ];

  const calculateEstimate = () => {
    const totalKoi = Object.values(koiCounts).reduce((a, b) => a + b, 0);
    const boxes = {
      large: 0,
      medium: 1,
      extraLarge: 0,
      specialLarge: 0,
    };
    const cost = 3800000; // Ví dụ giá cố định (VND)

    setEstimate({ boxes, cost });
    setShowCard(true);
  };

  // Hàm định dạng giá tiền VND
  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="koi-container">
      <Row gutter={[16, 16]}>
        {/* Left Side */}
        <Col xs={24} md={16} className="left-section">
          <Title level={4} className="page-title">
            Start by entering the amount of koi in each size category that you
            wish to ship. Click "Get Estimate" to update box and shipping
            estimate.
          </Title>

          {isLoading ? (
            <Spin tip="Loading Koi Sizes..." size="large" />
          ) : (
            <Table
              className="koi-table"
              dataSource={koiSizes.map((size, index) => ({
                ...size,
                key: size.id,
                sizeCM: `${size.sizeCmMin} - ${size.sizeCmMax} cm`,
                sizeInch: `${size.sizeInchMin} - ${size.sizeInchMax} in`,
              }))}
              columns={columns}
              pagination={false}
              bordered
            />
          )}

          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "25px",
              padding: "20px",
              flexWrap: "wrap",
              alignContent: "flex-start",
              justifyContent: "center"
            }}
          >
          <Button
            type="primary"
            className="get-estimate-button"
            style={{backgroundColor: "green", borderBlockColor:"green"}}
            onClick={calculateEstimate}
          >
            Get Estimate
          </Button>
          <Button type="primary" className="get-estimate-button"
            onClick={handleSubmit}>
            Submit Booking Service
          </Button>
        </div>
      </Col>

      {/* Right Side */}
      {showCard && (
        <Col xs={24} md={8} className="right-section">
          {/* Card for Number of Boxes */}
          <Card className="estimate-card">
            <Title level={5} className="card-title">
              Number of boxes you need
            </Title>
            <Text className="box-info">
              {estimate.boxes.large} large boxes, {estimate.boxes.medium}{" "}
              medium boxes, {estimate.boxes.extraLarge} extra large boxes and{" "}
              {estimate.boxes.specialLarge} special large boxes
            </Text>
          </Card>
          <Card
            className="cost-card"
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="./boxcost.png"
              alt="Box Price"
              className="box-image"
              style={{ width: "60px", height: "auto" }}
            />
            <Title level={5}>Box Cost</Title>
            <Text strong className="cost-amount">
              {formatVND(estimate.cost)}
            </Text>
          </Card>
          {/* Card for Total Shipping Cost */}
          <Card
            className="cost-card"
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="./truck.png"
              alt="Shipping Cost Illustration"
              className="cost-image"
              style={{ width: "60px", height: "auto" }}
            />
            <Title level={5}>Shipping cost</Title>
            <Text strong className="cost-amount">
              {formatVND(estimate.cost)}
            </Text>
          </Card>
          <Card
            className="cost-card"
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="./totalcost.png"
              alt="Shipping Cost Illustration"
              className="cost-image"
              style={{ width: "60px", height: "auto" }}
            />
            <Title level={5}>Total Cost</Title>
            <Text strong className="cost-amount">
              {formatVND(estimate.cost)}
            </Text>
          </Card>
        </Col>
      )}
    </Row>
    </div >
  );
};

export default GetEstimate;
