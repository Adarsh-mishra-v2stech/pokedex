import { CaretUpOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ScrollToTop = ({ scrollToTop }: { scrollToTop: () => void }) => {
  return (
    <Button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1,
        backgroundColor: "#FF5350",
        color: "white",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      <CaretUpOutlined />
    </Button>
  );
};

export default ScrollToTop;
