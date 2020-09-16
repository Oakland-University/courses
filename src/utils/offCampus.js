export const is_off_campus = (desc) => {
  desc = desc.toLowerCase()
  return (
    desc === 'mt. clemens' ||
    desc === 'macomb' ||
    desc === 'off-campus - domestic' ||
    desc === 'off-campus - international'
  )
}
