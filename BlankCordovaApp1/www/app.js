Ext.application({
    name: "BlankCordovaApp101",

    launch: function () {
        Ext.fly('appLoadingIndicator').destroy();

        var button = Ext.create('Ext.Button', {
            text: 'Test Button',
            listeners: {
                tap: function () {
                    Ext.Msg.alert("Warning!", "You clicked test button");
                }
            }
        });
        Ext.Viewport.add({ xtype: 'container', padding: 10, items: [button] })
    }
});