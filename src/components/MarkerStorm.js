import {Icon} from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/storm'

const MarkerStorm = ({lat,lng, onClick}) => {
    return (
        <div className="marker-storm"  onClick={onClick}>
            <Icon icon={locationIcon} className="location-icon"/>
        </div>
    )
}

export default MarkerStorm
