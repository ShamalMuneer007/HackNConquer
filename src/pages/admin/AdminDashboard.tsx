import instance from "@/config/axiosConfig";
import {
  PAYMENT_SERVICE_URL,
  PROBLEM_SERVICE_URL,
  USER_SERVICE_URL,
} from "@/constants/service_urls";
import { logout } from "@/redux/reducers/userSlice";
import { Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [userAuditLogs, setUserAuditLogs] = useState([]);
  const [paymentInterval, setPaymentInterval] = useState("yearly");
  const [problemCount, setProblemCount] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState<number>(0);
  const [graphData, setGraphData] = useState<any>();
  const dispatch = useDispatch();
  const [totalRevenue, setTotalRevenue] = useState<number>();
  const prepareData = (data: any, interval: string) => {
    const result = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (interval === "yearly") {
      const startYear = currentYear - 4; // Start from 4 years ago

      for (let year = currentYear; year >= startYear; year--) {
        const yearData = data.filter((item: any) =>
          item.subscribedAt.startsWith(`${year}`)
        );
        const amount = yearData.reduce(
          (sum: any, item: any) => sum + item.amount,
          0
        );
        result.push({ period: year, revenue: amount });
      }

      return result;
    } else if (interval === "monthly") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      for (let month = 0; month <= 12; month++) {
        const monthData = data.filter((item: any) =>
          item.subscribedAt.startsWith(
            `${currentYear}-${String(month).padStart(2, "0")}`
          )
        );
        const amount = monthData.reduce(
          (sum: any, item: any) => sum + item.amount,
          0
        );
        result.push({ period: months[month - 1], revenue: amount });
      }
    } else if (interval === "weekly") {
      const startDate = new Date(currentYear, currentMonth, 1); // Start from the first day of the current month
      const endDate = new Date(currentYear, currentMonth + 1, 0); // End on the last day of the current month
      let currentDate = startDate;
      let weekNumber = 1;

      while (currentDate <= endDate) {
        const weekStart = new Date(currentDate);
        const weekEnd = new Date(
          currentDate.getTime() + 6 * 24 * 60 * 60 * 1000
        ); // Add 6 days to get the end of the week

        const weekData = data.filter(
          (item: any) =>
            new Date(item.subscribedAt) >= weekStart &&
            new Date(item.subscribedAt) <= weekEnd
        );
        const amount = weekData.reduce(
          (sum: any, item: any) => sum + item.amount,
          0
        );
        result.push({ period: `Week ${weekNumber}`, revenue: amount });

        currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
        weekNumber++;
      }
    }

    return result;
  };
  useEffect(() => {
    if (revenueData) {
      const data = prepareData(revenueData, paymentInterval);
      console.log("GRAPH DATA ," + data);
      setGraphData(data);
    }
  }, [revenueData]);
  const fetchData = async (
    url: string,
    successCallback: (data: any) => void
  ) => {
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        successCallback(response.data);
      } else {
        toast.error("Something went wrong on our side..");
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else if (error.status > 500) {
        toast.error("Something went wrong on our side..");
      } else {
        toast.error(error.message);
      }
    }
  };

  const fetchUserCount = () => {
    fetchData(`${USER_SERVICE_URL}/user-count`, (data) =>
      setUserCount(data.userCount)
    );
  };

  const fetchProblemCount = () => {
    fetchData(`${PROBLEM_SERVICE_URL}/count/problem`, (data) =>
      setProblemCount(data.problemCount)
    );
  };

  const fetchActiveSubscriptions = () => {
    fetchData(`${PAYMENT_SERVICE_URL}/admin/subscriptions/active`, (data) =>
      setActiveSubscriptions(data)
    );
  };

  const fetchUserAuditLogs = () => {
    fetchData(`${USER_SERVICE_URL}/admin/audit-logs`, (data) =>
      setUserAuditLogs(data)
    );
  };

  const fetchTotalRevenue = () => {
    fetchData(`${PAYMENT_SERVICE_URL}/admin/total-revenue`, (data) =>
      setTotalRevenue(data.totalRevenue)
    );
  };

  const fetchPaymentInfo = () => {
    fetchData(
      `${PAYMENT_SERVICE_URL}/admin/revenue?interval=${
        paymentInterval || "yearly"
      }`,
      (data) => setRevenueData(data)
    );
  };
  useEffect(() => {
    fetchUserCount();
    fetchUserAuditLogs();
    fetchPaymentInfo();
    fetchProblemCount();
    fetchTotalRevenue();
    fetchActiveSubscriptions();
  }, []);
  const handleTabChange = (tab: string) => {
    setPaymentInterval(tab);
  };
  useEffect(() => {
    fetchPaymentInfo();
  }, [paymentInterval]);
  const tabData = [
    {
      label: "Yearly",
      value: "yearly",
    },
    {
      label: "Monthly",
      value: "monthly",
    },
    {
      label: "Weekly",
      value: "weekly",
    },
  ];
  return (
    <div className="page-padding">
      <h1 className="font-bold text-3xl text-white">Dashboard</h1>
      <div className="flex items-center gap-40">
        <div className="mt-10 h-[55vh] w-[90vh] flex flex-col justify-center items-center">
          <div className="my-5 flex justify-center">
            <ul className="flex">
              {tabData.map((tab, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-lg ${
                    paymentInterval === tab.value
                      ? `text-primary bg-gray-900`
                      : "text-gray-400 hover:text-primary "
                  }`}
                  onClick={() => handleTabChange(tab.value)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dot={false}
                dataKey="revenue"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-10 text-white justify-center font-bold">
          <div className="bg-dark-300 p-5 rounded-lg flex justify-center">
            No of Users : {" " + userCount}
          </div>
          <div className="bg-dark-300 p-5 rounded-lg flex justify-center">
            Vists : {" " + userAuditLogs.length}
          </div>
          <div className="bg-dark-300 p-5 rounded-lg flex justify-center">
            Problem Count : {problemCount}
          </div>
          <div className="bg-dark-300 p-5 rounded-lg flex justify-center">
            Total Revenue : {totalRevenue} Rs
          </div>
          <div className="bg-dark-300 p-5 rounded-lg flex justify-center">
            Active Subscriptions : {activeSubscriptions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
