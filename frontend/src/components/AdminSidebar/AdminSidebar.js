import React from 'react'
import './AdminSidebar.css'

function AdminSidebar() {
  return (
    <div>


<div id="wrapper" class="active">
      
      {/* <!-- Sidebar -->
            <!-- Sidebar --> */}
      <div id="sidebar-wrapper">
      <ul id="sidebar_menu" class="sidebar-nav">
           <li class="sidebar-brand"><a id="menu-toggle" href="#">Menu<span id="main_icon" class="glyphicon glyphicon-align-justify"></span></a></li>
      </ul>
        <ul class="sidebar-nav" id="sidebar">     
          <li><a>Link1<span class="sub_icon glyphicon glyphicon-link"></span></a></li>
          <li><a>link2<span class="sub_icon glyphicon glyphicon-link"></span></a></li>
        </ul>
      </div>
          
      {/* <!-- Page content --> */}
      <div id="page-content-wrapper">
        {/* <!-- Keep all page content within the page-content inset div! --> */}
        <div class="page-content inset">
          <div class="row">
              <div class="col-md-12">
              <p class="well lead">An Experiment using the sidebar template from startbootstrap.com which I integrated in my website (<a href="http://animeshmanglik.name">animeshmanglik.name</a>)</p>
              <p class="well lead">Click on the Menu to Toggle Sidebar . Hope you enjoy it!</p> 
            </div>
          </div>
        </div>
      </div>
      
    </div>
      
    </div>
  )
}

export default AdminSidebar
