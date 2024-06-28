/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Switch, Text, List} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import permissionStore from '../store/permissionStore';

const AppPermissionsScreen = observer(() => {
  useEffect(() => {
    permissionStore.checkInitialPermissions();
  }, []);

  const handleNotificationToggle = async () => {
    await permissionStore.handlePermissionToggle('notification');
  };

  const handleCameraToggle = async () => {
    await permissionStore.handlePermissionToggle('camera');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <List.Item
          title="Notification"
          right={() => (
            <Switch
              value={permissionStore.notificationPermission}
              onValueChange={handleNotificationToggle}
            />
          )}
        />
        <List.Item
          title="Camera"
          right={() => (
            <Switch
              value={permissionStore.cameraPermission}
              onValueChange={handleCameraToggle}
            />
          )}
        />
      </View>
      <View style={styles.footer}>
        <Text>Powered By</Text>
        <Text style={styles.brand}>Rafeeq</Text>
        <Text>Version 1.1.0b7</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  brand: {
    color: '#f00',
    fontWeight: 'bold',
  },
});

export default AppPermissionsScreen;
