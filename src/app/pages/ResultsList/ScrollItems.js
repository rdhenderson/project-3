import React from 'react'

export const VenueScrollItem = ({ item, clickHandler}) => (
  <div className="mreview__body__item"
    onClick={clickHandler(item._id)}>
    <div className="mreview__body__item__imgdiv">
      <img className="mreview__body__item__imgdiv__img"
        src={(item.images && item.images.length > 0) ?
        item.images[0] : "http://lorempixel.com/100/100"}
      />
      <h3> {item.name} </h3>

    </div>
    <div className="mreview__body__item__text">
      <p>{item.description}</p>
      {/* <img src="http://lorempixel.com/500/100" /> */}
      <ul>
        {item.staff.map( (staff, index) => (
          <li key={index}> {staff.name}: {staff.role} </li>
        ))}
      </ul>
    </div>
  </div>
);

export const UserScrollItem = ({ item, clickHandler }) => (
  <div className="mreview__body__item" onClick={clickHandler(item._id)}>
    <div className="mreview__body__item__imgdiv">
      <img className="mreview__body__item__imgdiv__img" src={item.profile_image.img} style={item.profile_image.imageStyle}/>
      <h3> {item.name} </h3>

    </div>
    <div className="mreview__body__item__text">
      <p>{item.description}</p>
      {/* <img src="http://lorempixel.com/500/100" /> */}
      <ul>
        {item.bands && item.bands.map( (band, index) => (
          <li key={index}> Group#{index}: {band.name} </li>
        ))}
      </ul>
    </div>
  </div>
);

export const GroupScrollItem = ({ item, clickHandler }) => (
  <div className="mreview__body__item" onClick={clickHandler(item._id)}>
    <div className="mreview__body__item__imgdiv">
      <img className="mreview__body__item__imgdiv__img" src="http://lorempixel.com/100/100" />
      <h3> {item.name} </h3>

    </div>
    <div className="mreview__body__item__text">
      <p>{item.description}</p>
      {/* <img src="http://lorempixel.com/500/100" /> */}
      <ul>
        {item.members && item.members.map( (band, index) => (
          <li key={index}> Member#{index}: {member.name} - {member.instrument} </li>
        ))}
      </ul>
    </div>
  </div>
);
