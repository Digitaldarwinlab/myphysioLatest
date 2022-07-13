import Utils from './Utils';
export default function DateCell(props) {
  const { date, text } = props.itemData;
  const isDisableDate = Utils.isValidDate(date);
  // dx-scheduler-cell-sizes-horizontal
  return (
    <div className={isDisableDate ? 'disable-date' : null}>
      <div>{text}</div>
    </div>
  )
}