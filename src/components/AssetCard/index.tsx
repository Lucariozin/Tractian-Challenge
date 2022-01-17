import styles from './styles.module.scss';
import { Image, Button } from 'antd';

import { Asset } from '../../pages/assets';

import { api } from '../../services/api';

import { InfoItem } from '../InfoItem';
import { useState } from 'react';

interface AssetCardProps {
  id: number;
  healthscore: number;
  status: 'inAlert' | 'inDowntime' | 'inOperation';
  model: string;
  sensors: string[];
  maxTemp: number;
  power?: number;
  rpm?: number;
  totalCollectsUptime: number;
  totalUptime: number;
  lastUptimeAt: string;
  name: string;
  image: string;
};

export function AssetCard({
  id,
  healthscore,
  status,
  model,
  sensors,
  maxTemp,
  power = 0,
  rpm = 0,
  totalCollectsUptime,
  totalUptime,
  lastUptimeAt,
  name,
  image
}: AssetCardProps) {
  const [assetData, setAssetData] = useState({
    id,
    healthscore,
    status,
    model,
    sensors,
    maxTemp,
    power,
    rpm,
    totalCollectsUptime,
    totalUptime,
    lastUptimeAt,
    name,
    image
  });

  const [refreshLoading, setRefreshLoading] = useState(false);

  async function handleRefreshData() {
    setRefreshLoading(true);

    const { data }: { data: Asset } = await api.get(`https://my-json-server.typicode.com/tractian/fake-api/assets/${assetData.id}`);

    setAssetData({
      id: data.id,
      healthscore: data.healthscore,
      status: data.status,
      model: data.model,
      sensors: data.sensors,
      maxTemp: data.specifications.maxTemp,
      power: data.specifications.power,
      rpm: data.specifications.rpm,
      totalCollectsUptime: data.metrics.totalCollectsUptime,
      totalUptime: data.metrics.totalUptime,
      lastUptimeAt: data.metrics.lastUptimeAt,
      name: data.name,
      image: data.image,
    });

    setRefreshLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles['info-container']}>
        <InfoItem infoKey="Health" value={assetData.healthscore} isHealth />
        <InfoItem infoKey="Status" value={assetData.status} isStatus />
        <InfoItem infoKey="Model" value={assetData.model} />

        {assetData.sensors.length > 1 ? (
          <InfoItem infoKey="Sensors" value={assetData.sensors.join(' | ')} />
        ) : (
          <InfoItem infoKey="Sensor" value={assetData.sensors[0]} />
        )}

        <InfoItem infoKey="MaxTemp" value={`${assetData.maxTemp}º`} />

        {assetData.power > 0 && (
          <InfoItem infoKey="Power" value={`${assetData.power} kWh`} />
        )}

        {assetData.rpm > 0 && (
          <InfoItem infoKey="RPM" value={assetData.rpm} />
        )}

        <InfoItem infoKey="TotalCollectsUptime" value={assetData.totalCollectsUptime} />
        <InfoItem infoKey="TotalUptime" value={Math.floor(assetData.totalUptime)} />

        <InfoItem
          infoKey="LastUptimeAt"
          value={new Date(assetData.lastUptimeAt).toLocaleDateString()}
        />
      </div>

      <div className={styles['image-container']}>
        <div className={styles['name-container']}>
          {assetData.name}

          <Button
            type="primary"
            size="middle"
            shape="round"
            onClick={handleRefreshData}
            loading={refreshLoading}
            style={{ fontWeight: 600, marginLeft: "1rem" }}
          >
            Refresh data
          </Button>
        </div>

        <div className={styles['image']}>
          <Image
            src={assetData.image}
            alt={assetData.name}
          />
        </div>
      </div>
    </div>
  );
}
