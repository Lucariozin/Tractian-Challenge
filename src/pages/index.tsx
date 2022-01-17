import styles from '../styles/Home.module.scss';

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { Chart } from "../components/Chart";
import { api } from "../services/api";
import { Asset } from "./assets";

interface HomeProps {
  assets: Asset[];
};

export default function Home({ assets }: HomeProps) {
  const [totalCollectsUptimeCategories, setTotalCollectsUptimeCategories] = useState<string[]>([]);
  const [totalCollectsUptimeData, setTotalCollectsUptimeData] = useState<number[]>([]);

  useEffect(() => {

    setTotalCollectsUptimeCategories(assets.map((asset) => asset.name));
    setTotalCollectsUptimeData(assets.map((asset) => asset.metrics.totalCollectsUptime));

  }, [assets]);

  return (
    <div className={styles.container}>
      <Chart
        title='Total Collects Uptime'
        yAxisTitle='Collects'
        seriesName='Total'
        categories={totalCollectsUptimeCategories}
        data={totalCollectsUptimeData}
        width={1055}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data }: { data: Asset[] } = await api.get('https://my-json-server.typicode.com/tractian/fake-api/assets');

  return {
    props: {
      assets: data,
    },
  };
};
