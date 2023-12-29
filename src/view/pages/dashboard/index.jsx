import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Row, Col } from "antd";
import { WalletMinus, Login, Add, Logout } from "iconsax-react";
import axios from "axios";
import FeatureCard from "../../main/dashboard/analytics/featureCard";
// import BalanceCard from "../../main/dashboard/analytics/featureCardbalanceCard";
import ListCard from "../../main/dashboard/analytics/listCard";
import AreaChart from "../../main/widgets/charts/areaChart";
import ScatterChart from "../../main/widgets/charts/scatterChart";
import ProtectedAppPage from "../Protected";
export default function Analytics() {
  // Redux
  const customise = useSelector((state) => state.customise);
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8083/api/dashboard/stats?companyId=${user?.user?.companyId}`,
        {
          headers: {
            Authorization: user?.accessToken,
            // Add other headers if needed
          },
        }
      );
      setData(response.data); // Assuming the response.data is an array of departments
      console.log(response?.data);
    } catch (error) {
      console.error("Error fetching stats", error?.message);
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
    // Fetch data when the component mounts
    fetchData();
  }, []);
  return (
    <>
      <Row gutter={[32, 32]} className="hp-mb-32">
        <Col flex="1" className="hp-overflow-hidden">
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <h1 className="hp-mb-0">Dashboard</h1>
            </Col>

            <Col span={24}>
              <AreaChart />
            </Col>
            <Col span={24}>
              <ScatterChart />
            </Col>
          </Row>
        </Col>

        {customise.contentWidth === "boxed" && (
          <Col className="hp-dashboard-line hp-px-0">
            <div
              className="hp-bg-black-40 hp-bg-dark-80 hp-h-100 hp-mx-24"
              style={{ width: 1 }}
            ></div>
          </Col>
        )}

        <Col
          // className={`hp-analytics-col-2${
          //   customise.contentWidth && " hp-boxed-active"
          //   }`}
          flex="1"
          className="hp-overflow-hidden"
        >
          <Row gutter={[32, 32]}>
            <Col span={24}>{/* <CreditCard /> */}</Col>
            <Col span={24}>
              <Row gutter={[32, 32]}>
                <Col sm={10} span={24}>
                  <FeatureCard
                    icon={
                      <WalletMinus
                        size="24"
                        variant="Bold"
                        className="hp-text-color-black-bg hp-text-color-dark-0"
                      />
                    }
                    title="Departments"
                    count={data?.departmentCount || "0"}
                  />
                </Col>
                <Col sm={10} span={24}>
                  <FeatureCard
                    icon={
                      <WalletMinus
                        size="24"
                        variant="Bold"
                        className="hp-text-color-black-bg hp-text-color-dark-0"
                      />
                    }
                    title="Projects"
                    count={data?.projectCount || "0"}
                  />
                </Col>
                <Col sm={10} span={24}>
                  <FeatureCard
                    icon={
                      <WalletMinus
                        size="24"
                        variant="Bold"
                        className="hp-text-color-black-bg hp-text-color-dark-0"
                      />
                    }
                    title="MDR"
                    count={data?.mdrCount || "0"}
                  />
                </Col>
                <Col sm={10} span={24}>
                  <FeatureCard
                    icon={
                      <WalletMinus
                        size="24"
                        variant="Bold"
                        className="hp-text-color-black-bg hp-text-color-dark-0"
                      />
                    }
                    title="Employees"
                    count={data?.employeeCount || "0"}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <ListCard
                title="System Logs"
                date="05 Dec 2021"
                list={[
                  {
                    icon: <Login />,
                    title: "Mike Logged In",
                    date: "11:30",
                  },
                  {
                    icon: <Add />,
                    title: "Jack Created Project",
                    date: "11:34",
                  },
                  {
                    icon: <Logout />,
                    title: "Mike Logged Out",
                    date: "11:34",
                  },
                  {
                    icon: <Add />,
                    title: "Kim Created Project",
                    date: "11:37",
                  },
                  {
                    icon: <Add />,
                    title: "Jackey Created Project",
                    date: "13:34",
                  },
                  {
                    icon: <Add />,
                    title: "Jack Created Project",
                    date: "14:34",
                  },
                  {
                    icon: <Add />,
                    title: "Jack Created Project",
                    date: "19:14",
                  },
                  {
                    icon: <Logout />,
                    title: "Hne Logged Out",
                    date: "20:12:",
                  },
                  {
                    icon: <Logout />,
                    title: "Kim Logged Out",
                    date: "20:45",
                  },
                  {
                    icon: <Logout />,
                    title: "Jack Logged Out",
                    date: "21:34",
                  },
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <ProtectedAppPage />
    </>
  );
}
