UPDATE events
SET event_id=${event_id},
event_name=${event_name},
cover_photo=${cover_photo},
description=${description},
place=${place},
city=${city},
country=${country},
latitude=${latitude},
longitude=${longitude},
state=${state},
street=${street},
zip=${zip},
start_time=${start_time},
creator_id=${creator_id}
WHERE event_id = ${event_id}
