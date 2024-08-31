import React from 'react';
import styles from '../styles/ExperienceCard.module.css';

interface ExperienceCardProps {
    date: string;
    role: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ date, role }) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.date}>{date}</div>
        <div className={styles.role}>{role}</div>
        <div className={styles.line}/>
    </div>
  )
}

export default ExperienceCard;