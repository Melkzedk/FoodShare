import React from 'react';
import PostForm from '../components/Posts/PostForm';
import FoodList from '../components/Posts/FoodList';
import MapView from '../components/Map/MapView';


export default function Home() {
return (
<div>
<div className="row">
<div className="col-md-5">
<PostForm />
<FoodList />
</div>
<div className="col-md-7">
<MapView />
</div>
</div>
</div>
);
}