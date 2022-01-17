import { Menu as AntdMenu, Typography } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

import { api } from '../../services/api';
import Router from 'next/router';

import { useEffect, useState } from 'react';
import { useMenu } from '../../hooks/useMenu';

const { SubMenu, Item } = AntdMenu;

type Company = {
  id: number;
  name: string;
};

type Unit = {
  id: number;
  name: string;
  companyId: number;
};

export function Menu() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  const { closeMenu } = useMenu();

  function handleRedirectToUsersPage(companyId: number, unitId: number) {
    closeMenu();

    Router.push(`/users?cid=${companyId}&uid=${unitId}`);
  }

  function handleRedirectToAssetsPage(companyId: number, unitId: number) {
    closeMenu();

    Router.push(`/assets?cid=${companyId}&uid=${unitId}`);
  }

  useEffect(() => {
    api.get('https://my-json-server.typicode.com/tractian/fake-api/companies').then((response) => {
      setCompanies(response.data);
    });

    api.get('https://my-json-server.typicode.com/tractian/fake-api/units').then((response) => {
      setUnits(response.data);
    });
  }, []);

  return (
    <AntdMenu
      mode="inline"
      theme="dark"
      style={{ width: 256 }}
    >
      <Typography.Title
        level={2}
        style={{
          color: "#ebebeb",
          fontSize: "2.5rem",
          textAlign: "center",
          margin: "1rem 0 2rem 0"
        }}
      >
        challenge
      </Typography.Title>

      <SubMenu key="companies" icon={<AppstoreOutlined />} title="Companies">
        
        {companies.map((company) => (
          <SubMenu key={company.name} title={company.name}>
            <SubMenu key={`${company.name}-units`} title="Units">

              {units.map((unit) => {
                if (unit.companyId === company.id) return (
                  <SubMenu key={`unit-${unit.name}`} title={unit.name}>
                    <Item
                      key={`assets-${unit.name}`}
                      onClick={() => handleRedirectToAssetsPage(company.id, unit.id)}
                    >
                      Assets
                    </Item>

                    <Item
                      key={`users-${unit.name}`}
                      onClick={() => handleRedirectToUsersPage(company.id, unit.id)}
                    >
                      Users
                    </Item>
                  </SubMenu>
                );
              })}

            </SubMenu>
          </SubMenu>
        ))}
        
      </SubMenu>
    </AntdMenu>
  );
}
