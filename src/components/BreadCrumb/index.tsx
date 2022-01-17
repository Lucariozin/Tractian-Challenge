import { Breadcrumb } from 'antd';
import styles from './styles.module.scss';

interface BreadCrumbProps {
  texts: string[];
};

export function BreadCrumb({ texts }: BreadCrumbProps) {
  return (
    <Breadcrumb className={styles.breadcrumb}>
      
      {texts.map((text, index) => (
        <Breadcrumb.Item key={`${text}-${index + 1}`}>{text}</Breadcrumb.Item>
      ))}
      
    </Breadcrumb>
  );
}
