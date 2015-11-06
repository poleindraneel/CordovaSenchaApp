
Ext.define('BlankCordovaApp101.view.Main',{
    extend: 'Ext.Container',
    xtype: 'Main',
    fullscreen: true,
    config: {
        id: 'mainView', //this id can be used for getter setter object in controller refs
    }
});

Ext.define('BlankCordovaApp101.view.phone.Main', {
    extend: 'BlankCordovaApp101.view.Main',
    xtype: 'phone',
    fullscreen: true,
    config: {
        id: 'phoneMainView',
        items: [
        {
            xtype: 'button',
            text: 'Button created inside a phone view',
            ref: 'testBtn'
        }]
    }
});

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
    }]
}
});

Ext.define('BlankCordovaApp101.controller.UserController', {
    extend: 'Ext.app.Controller',
    views: ['BlankCordovaApp101.view.Main','BlankCordovaApp101.view.phone.Main'],
    config: {
        refs: {
            mainView: '#mainView', //Needs hash in front of it
            tstBtn: 'button[ref=testBtn]'
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
        var nav = me.getMainView();
        Ext.Msg.alert("Warning!", "You clicked test button");
    },
});
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
