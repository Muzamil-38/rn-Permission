/* eslint-disable prettier/prettier */
import {makeAutoObservable} from 'mobx';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

class PermissionStore {
  notificationStatus: string = '';
  cameraStatus: string = '';
  cameraPermission: boolean = false;
  notificationPermission: boolean = false;
  totalPermissions: number = 2;
  grantedPermissions: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.checkInitialPermissions();
  }

  checkInitialPermissions = async () => {
    await this.checkNotificationPermission();
    await this.checkCameraPermission();
    this.updateGrantedPermissions();
    console.log('Initial permission status:');
    console.log(`Notification: ${this.notificationPermission}`);
    console.log(`Camera: ${this.cameraPermission}`);
  };

  checkNotificationPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH);
    this.notificationStatus = status;
    this.notificationPermission = status === RESULTS.GRANTED;
  };

  requestNotificationPermission = async () => {
    console.log('Requesting notification permission');
    const status = await request(PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH);
    this.notificationStatus = status;
    this.notificationPermission = status === RESULTS.GRANTED;
    this.updateGrantedPermissions();
  };

  checkCameraPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.CAMERA);
    this.cameraStatus = status;
    this.cameraPermission = status === RESULTS.GRANTED;
  };

  requestCameraPermission = async () => {
    console.log('Requesting camera permission');
    const status = await request(PERMISSIONS.ANDROID.CAMERA);
    this.cameraStatus = status;
    this.cameraPermission = status === RESULTS.GRANTED;
    this.updateGrantedPermissions();
  };

  openAppSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  updateGrantedPermissions = () => {
    this.grantedPermissions =
      (this.notificationPermission ? 1 : 0) + (this.cameraPermission ? 1 : 0);
  };

  handlePermissionToggle = async (
    permissionType: 'notification' | 'camera',
  ) => {
    console.log(`Toggling ${permissionType} permission`);
    if (permissionType === 'notification') {
      if (this.notificationStatus === RESULTS.BLOCKED) {
        this.openAppSettings();
      } else if (this.notificationPermission) {
        // Simulate revoking the permission
        this.notificationPermission = false;
        this.notificationStatus = RESULTS.DENIED;
      } else {
        await this.requestNotificationPermission();
      }
    } else if (permissionType === 'camera') {
      if (this.cameraStatus === RESULTS.BLOCKED) {
        this.openAppSettings();
      } else if (this.cameraPermission) {
        // Simulate revoking the permission
        this.cameraPermission = false;
        this.cameraStatus = RESULTS.DENIED;
      } else {
        await this.requestCameraPermission();
      }
    }
    this.updateGrantedPermissions();
  };
}

const permissionStore = new PermissionStore();
export default permissionStore;
