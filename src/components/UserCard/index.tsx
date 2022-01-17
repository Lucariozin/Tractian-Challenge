import styles from './styles.module.scss';
import { Avatar, Typography } from 'antd';

interface UserCardProps {
  name: string;
  email: string;
};

export function UserCard({ name, email }: UserCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles['name-container']}>
        <Avatar>
          {name[0]}
        </Avatar>

        <Typography.Text>{name}</Typography.Text>
      </div>

      <Typography.Text>{email}</Typography.Text>
    </div>
  );
}
