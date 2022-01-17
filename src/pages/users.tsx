import styles from '../styles/Users.module.scss';

import { Typography } from "antd";

import { GetServerSideProps } from 'next';
import { api } from '../services/api';

import { UserCard } from '../components/UserCard';
import { BreadCrumb } from '../components/BreadCrumb';

type User = {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
};

interface UserPageProps {
  users: User[];
  companyName: string;
  unitName: string;
};

export default function UsersPage({ users, companyName, unitName }: UserPageProps) {
  return (
    <>
      <BreadCrumb texts={[companyName, 'Units', unitName, 'Users']} />

      <Typography.Title
        level={2}
        style={{ marginTop: '20px', marginLeft: '30px' }}
      >
        Users
      </Typography.Title>

      <div className={styles['users-container']}>
        
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} email={user.email} />
        ))}

      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { cid, uid } = query;

  const { data } = await api.get('https://my-json-server.typicode.com/tractian/fake-api/users');

  const users = data.filter((user) => {
    if (String(user.companyId) === cid && String(user.unitId) === uid) {
      return user;
    }

    return;
  });

  const companyResponse = await api.get(`https://my-json-server.typicode.com/tractian/fake-api/companies/${cid}`);
  const companyName = companyResponse.data.name;

  const unitResponse = await api.get(`https://my-json-server.typicode.com/tractian/fake-api/units/${uid}`);
  const unitName = unitResponse.data.name;

  return {
    props: {
      users,
      companyName,
      unitName,
    },
  };
};
