import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { usePreferences } from '@/hooks/usePreferences';
import { ChevronRight, Moon, Bell, Globe, Settings, LogOut, Heart } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would update the theme here
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    // In a real app, you would update notification settings here
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.userSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Bell size={20} color="#4A5568" />
          </View>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#E2E8F0', true: '#10B981' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Moon size={20} color="#4A5568" />
          </View>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#E2E8F0', true: '#10B981' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push('/preferences')}
        >
          <View style={styles.settingIconContainer}>
            <Globe size={20} color="#4A5568" />
          </View>
          <Text style={styles.settingText}>News Preferences</Text>
          <ChevronRight size={20} color="#A0AEC0" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Settings size={20} color="#4A5568" />
          </View>
          <Text style={styles.settingText}>App Settings</Text>
          <ChevronRight size={20} color="#A0AEC0" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIconContainer}>
            <Heart size={20} color="#4A5568" />
          </View>
          <Text style={styles.settingText}>About AInformed</Text>
          <ChevronRight size={20} color="#A0AEC0" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#E53E3E" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#1A365D',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7FAFC',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#718096',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  editButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#10B981',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#4A5568',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Roboto-Medium',
    color: '#E53E3E',
    fontSize: 16,
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 20,
    marginBottom: 30,
  },
});