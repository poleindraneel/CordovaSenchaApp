﻿/*
This is the main view of the application.
This view will be extended to phone and tablet view in order to get 
two different layouts for different screen size
*/
Ext.define('BlankCordovaApp101.view.Main',{
    extend: 'Ext.Container',
    xtype: 'Main',
    fullscreen: true,
    config: {
        id: 'mainView', //this id can be used for getter setter object in controller refs
    }
});
/*
This is the phone main view.
It has one button.
*/
Ext.define('BlankCordovaApp101.view.phone.Main', {
    extend: 'BlankCordovaApp101.view.Main',
    xtype: 'phone',
    fullscreen: true,
    config: {
        id: 'phoneMainView',
        items: [
        {
            xtype: 'button',
            text:  'Click here to open camera',
            ref:   'testBtn'
        },
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            width: 500,
            height: 400,
            ref: 'viewImage'

        },
        {
            xtype: 'image',
            height: 201,
            itemId: 'myImage'
        }
        ]
    }
});

Ext.define('BlankCordovaApp101.view.phone.Window', {
    extend: 'Ext.form.Panel',
    xtype: 'imageView',
    
    config: {
        fullscreen: true,
        id: 'imageView',
        items: [
            {
                xtype: 'image',
                height: 201,
                itemId: 'myimage'
            }
        ]
    }
});

/*
This is tablet main view.
This has one button.
*/
Ext.define('BlankCordovaApp101.view.tablet.Main', {
extend: 'BlankCordovaApp101.view.Main',
xtype: 'main',
fullscreen: true,
config: {
    id: 'tabMainView',
    items: [
    {
        xtype: 'button',
        text: 'Button created inside a tablet view',
        ref: 'testBtn'
    },
    {
        xtype: 'container',
        ref: 'viewImage'

    }]
}
});

/*
This is the controller. 
This will have a control function for both the buttons created in tab and phone view
This will be carried out by having same reference tag for both the buttons.
*/
Ext.define('BlankCordovaApp101.controller.UserController', {
    extend: 'Ext.app.Controller',
    views: ['BlankCordovaApp101.view.Main'],
    config: {
        refs: {
            mainView: '#phoneMainView', //Needs hash in front of it
            tstBtn: 'button[ref=testBtn]',
            imgView: 'container[ref=viewImage]'
        },
        control: {
            tstBtn: {
                tap: 'onBtnClick'
            }
        }
    },
    onBtnClick: function () {
        console.log("inside on click function");
        var me = this;
        var imgNew;
        var nav = me.getMainView();
        var img = me.getImgView();
        navigator.camera.getPicture(function (imageData) {
            imgNew = imageData;
            var form = Ext.create("BlankCordovaApp101.view.phone.Window");
            form.getComponent('myimage').setSrc(imgNew);
            me.getMainView().push(form);
            //me.getImgView().html = "<div id='imgView'> <img src='" + imageData + "' style='width:75%;'></img></div>";
        }, null, null);

        //Ext.Msg.alert("Warning!", "Your picture is captured");
    },
});

/*
This is the phone profile.
It checks if the device is phone.
If yes, it launches a function that adds phone view to the viewport
*/
Ext.define('BlankCordovaApp101.profile.Phone', {
    extend: 'Ext.app.Profile',
    config: {
        name: 'Phone',
        views: ['Main']
    },

    isActive: function () {
        console.log("Phone view is "+Ext.os.is('Phone'));
        return Ext.os.is('Phone');
    },
    launch: function () {
        Ext.Viewport.add(Ext.create('BlankCordovaApp101.view.phone.Main', { fullscreen: true }));
    }
});

/*
This is the tablet profile.
It checks if the device is tablet.
If yes, it launches a function that adds tablet view to the viewport
*/
Ext.define('BlankCordovaApp101.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        views: ['Main']
    },

    isActive: function () {
        console.log("Tablet view is " + Ext.os.is('Tablet'));
        return Ext.os.is('Tablet');
    },
    launch: function () {
    Ext.Viewport.add(Ext.create('BlankCordovaApp101.view.tablet.Main', { fullscreen: true }));
}
});
/*
This is the entry point of the application.
*/
Ext.application({
    name: "BlankCordovaApp101",
    requires: ['Ext.MessageBox'],

    views: ['Main'],
    controllers: ['UserController'],
    profiles: ['Phone','Tablet'],
    launch: function () {
        Ext.fly('appLoadingIndicator').destroy();
    }
});
