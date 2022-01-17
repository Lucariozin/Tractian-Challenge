import styles from '../styles/Assets.module.scss';
import { Typography } from 'antd';

import { api } from '../services/api';
import { GetServerSideProps } from 'next';

import { Chart } from '../components/Chart';
import { BreadCrumb } from '../components/BreadCrumb';

import { useEffect, useState } from 'react';
import { AssetCard } from '../components/AssetCard';

export type Asset = {
  id: number;
  sensors: string[];
  model: string;
  status: 'inAlert' | 'inOperation' | 'inDowntime';
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string;
  };
  unitId: number;
  companyId: number;
};

interface AssetsProps {
  assets: Asset[];
  companyName: string;
  unitName: string;
};

export default function Assets({ assets, companyName, unitName }: AssetsProps) {
  const [totalCollectsUptimeCategories, setTotalCollectsUptimeCategories] = useState<string[]>([]);
  const [totalCollectsUptimeData, setTotalCollectsUptimeData] = useState<number[]>([]);

  const [healthScoreCategories, setHealthScoreCategories] = useState<string[]>([]);
  const [healthScoreData, setHealthScoreData] = useState<number[]>([]);

  useEffect(() => {

    setTotalCollectsUptimeCategories(assets.map((asset) => asset.name));
    setTotalCollectsUptimeData(assets.map((asset) => asset.metrics.totalCollectsUptime));

    setHealthScoreCategories(assets.map((asset) => asset.name));
    setHealthScoreData(assets.map((asset) => asset.healthscore));

  }, [assets]);

  return (
    <>
      <BreadCrumb texts={[companyName, 'Units', unitName, 'Assets']} />

      <div className={styles['charts-container']}>
        <Chart
          title='Total Collects Uptime'
          yAxisTitle='Collects'
          seriesName='Total'
          categories={totalCollectsUptimeCategories}
          data={totalCollectsUptimeData}
          width={530}
          height={340}
        />

        <Chart
          title='Health'
          yAxisTitle='Level'
          seriesName='Health - %'
          columColor='#36be1bb9'
          categories={healthScoreCategories}
          data={healthScoreData}
          width={530}
          height={340}
        />
      </div>

      <Typography.Title
        level={2}
        style={{ marginTop: '30px', marginLeft: '30px' }}
      >
        Assets
      </Typography.Title>

      <div className={styles['assets-container']}>
        
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            id={asset.id}
            healthscore={asset.healthscore}
            image={asset.image}
            lastUptimeAt={asset.metrics.lastUptimeAt}
            maxTemp={asset.specifications.maxTemp}
            model={asset.model}
            name={asset.name}
            sensors={asset.sensors}
            status={asset.status}
            totalCollectsUptime={asset.metrics.totalCollectsUptime}
            totalUptime={asset.metrics.totalUptime}
            power={asset.specifications.power}
            rpm={asset.specifications.rpm}
          />
        ))}
        
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { cid, uid } = query;

  const { data }: { data: Asset[] } = await api.get('https://my-json-server.typicode.com/tractian/fake-api/assets');

  const assets = data.filter((asset) => {
    if (String(asset.companyId) === cid && String(asset.unitId) === uid) {
      return asset;
    }
  });

  const companyResponse = await api.get(`https://my-json-server.typicode.com/tractian/fake-api/companies/${cid}`);
  const companyName = companyResponse.data.name;

  const unitResponse = await api.get(`https://my-json-server.typicode.com/tractian/fake-api/units/${uid}`);
  const unitName = unitResponse.data.name;

  return {
    props: {
      assets,
      companyName,
      unitName
    },
  };
};
