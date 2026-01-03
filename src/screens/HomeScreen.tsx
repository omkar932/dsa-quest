import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components/common/Button';
import { useTheme } from '../hooks/useTheme';
import { useProgress } from '../hooks/useProgress';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { progress } = useProgress();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#6C63FF', '#3B36C1']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.titleContainer}>
              <Ionicons name="code-slash" size={48} color="#FFFFFF" />
              <Text style={styles.title}>DSA Quest</Text>
            </View>
            <Text style={styles.subtitle}>
              Master Data Structures & Algorithms through gameplay
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View
          style={[
            styles.statsSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={32} color="#FBBF24" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {progress.totalStars}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Stars Earned
              </Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="stats-chart" size={32} color="#10B981" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {progress.totalXp}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Total XP
              </Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="card" size={32} color="#8B5CF6" />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {progress.unlockedCards.length}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Cards Collected
              </Text>
            </View>
          </View>
        </View>

        {/* Main Actions */}
        <View style={styles.actionsSection}>
          <Button
            title="Continue Journey"
            onPress={() => navigation.navigate('WorldMap')}
            icon="play"
            size="large"
            fullWidth
            variant="primary"
            style={styles.actionButton}
          />

          <Button
            title="Card Collection"
            onPress={() => navigation.navigate('Cards')}
            icon="card"
            size="large"
            fullWidth
            variant="secondary"
            style={styles.actionButton}
          />

          <Button
            title="World Map"
            onPress={() => navigation.navigate('WorldMap')}
            icon="map"
            size="large"
            fullWidth
            variant="outline"
            style={styles.actionButton}
          />
        </View>

        {/* Features */}
        <View
          style={[
            styles.featuresSection,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            How to Play
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View
                style={[styles.featureIcon, { backgroundColor: '#3B82F6' }]}
              >
                <Ionicons name="shield" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.featureContent}>
                <Text
                  style={[styles.featureTitle, { color: theme.colors.text }]}
                >
                  Health System
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Time complexity affects your health. Choose optimal
                  algorithms!
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View
                style={[styles.featureIcon, { backgroundColor: '#8B5CF6' }]}
              >
                <Ionicons name="card" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.featureContent}>
                <Text
                  style={[styles.featureTitle, { color: theme.colors.text }]}
                >
                  Algorithm Cards
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Collect and upgrade cards to unlock powerful optimizations
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View
                style={[styles.featureIcon, { backgroundColor: '#10B981' }]}
              >
                <Ionicons name="git-branch" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.featureContent}>
                <Text
                  style={[styles.featureTitle, { color: theme.colors.text }]}
                >
                  Visual Learning
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  See data structures come to life with interactive animations
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsSection: {
    marginTop: -32,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  actionsSection: {
    padding: 24,
    paddingTop: 32,
  },
  actionButton: {
    marginBottom: 12,
  },
  featuresSection: {
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
