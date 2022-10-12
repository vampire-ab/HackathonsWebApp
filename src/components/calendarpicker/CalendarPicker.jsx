import React, { useState } from 'react'
import Calendar from 'moedim';


export default function CalendarPicker() {
  const [value, setValue] = useState(new Date());
  return (
    <Calendar value={value} onChange={(d) => setValue(d)} />
  )
}
