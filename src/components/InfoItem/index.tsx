import styles from './styles.module.scss';
import { Typography } from 'antd';

interface InfoItemProps {
  infoKey: string | number;
  value: string | number;
  isHealth?: boolean;
  isStatus?: boolean;
};

export function InfoItem({
  infoKey,
  value,
  isHealth = false,
  isStatus = false
}: InfoItemProps) {

  if (isHealth) {
    return (
      <div className={styles.container}>
        <span>{infoKey}</span> : 
        <span>
          <Typography.Text
            style={{
              color: Number(value) < 20 ? "#e23630" : Number(value) < 60 ? "#d7e424" : "#92ce19",
              marginLeft: '0.5rem'
            }}
          >
            {value}%
          </Typography.Text>
        </span>
      </div>
    );
  }

  if (isStatus) {
    return (
      <div className={styles.container}>
        <span>{infoKey}</span> : 
        <span>
          <Typography.Text
            style={{
              marginLeft: '0.5rem',
              color: value === "inAlert" ? "#e23630": value === "inOperation" ? "#92ce19" : "#c0c0c0",
            }}
          >
            {value}
          </Typography.Text>
        </span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span>{infoKey}</span> : <span>{value}</span>
    </div>
  );
}
