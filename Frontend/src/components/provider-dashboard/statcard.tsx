import { Card, Statistic } from "antd";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <Card hoverable>
      <Statistic title={title} value={value} valueStyle={{ color }} />
    </Card>
  );
};

export default StatCard;
