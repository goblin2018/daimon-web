import styles from './calendar.module.css'

interface Props {
  value: string
  x1Line: number
  y1Line: number
  y2Line: number
  xText: number
  yText: number
}

const TopPartOfCalendar: React.FC<Props> = ({
  value,
  x1Line,
  y1Line,
  y2Line,
  xText,
  yText,
}) => {
  return (
    <g className="calendarTop">
      <line
        x1={x1Line}
        y1={y1Line}
        x2={x1Line}
        y2={y2Line}
        className={styles.calendarTopTick}
      />
      <text
        key={value + 'text'}
        y={yText}
        x={xText}
        className={styles.calendarTopText}
      >
        {value}
      </text>
    </g>
  )
}

export default TopPartOfCalendar
