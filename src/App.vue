<template>
    <v-app>
      <v-app-bar color="primary" prominent>
        <v-app-bar-title>
          <v-icon class="mr-2">mdi-transfer</v-icon>
          Client Migration Tool
        </v-app-bar-title>
      </v-app-bar>
  
      <v-main>
        <v-container fluid class="pa-6">
          <v-row>
            <!-- Legacy Clients Section -->
            <v-col cols="12" md="6">
              <v-card elevation="3">
                <v-card-title class="bg-orange text-white">
                  <v-icon class="mr-2">mdi-alert-circle</v-icon>
                  Legacy System Clients
                  <v-spacer></v-spacer>
                  <v-chip color="white" text-color="orange">
                    {{ legacyClientsCount }} clients
                  </v-chip>
                </v-card-title>
  
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="legacyHeaders"
                    :items="legacyClients"
                    :loading="loading"
                    loading-text="Loading clients..."
                    no-data-text="All clients have been migrated!"
                    class="elevation-0"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        color="primary"
                        size="small"
                        @click="migrateClient(item.id)"
                        :loading="migrating === item.id"
                        :disabled="loading"
                      >
                        <v-icon left>mdi-arrow-right</v-icon>
                        Migrate
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
  
            <!-- New System Clients Section -->
            <v-col cols="12" md="6">
              <v-card elevation="3">
                <v-card-title class="bg-success text-white">
                  <v-icon class="mr-2">mdi-check-circle</v-icon>
                  New System Clients
                  <v-spacer></v-spacer>
                  <v-chip color="white" text-color="success">
                    {{ newClients.length }} migrated
                  </v-chip>
                </v-card-title>
  
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="newHeaders"
                    :items="newClients"
                    :loading="loading"
                    loading-text="Loading migrated clients..."
                    no-data-text="No migrated clients yet"
                    class="elevation-0"
                  >
                    <template v-slot:item.status="{ item }">
                      <v-chip color="success" size="small">
                        <v-icon left size="small">mdi-check</v-icon>
                        Migrated
                      </v-chip>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
  
      <!-- Snackbar for notifications -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
        location="bottom right"
      >
        {{ snackbar.message }}
        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </template>
  
  <script>
  import api from './services/api'
  
  export default {
    name: 'App',
    data() {
      return {
        legacyClients: [],
        newClients: [],
        loading: false,
        migrating: null,
        snackbar: {
          show: false,
          message: '',
          color: 'success',
        },
        legacyHeaders: [
          { title: 'ID', key: 'id', sortable: true },
          { title: 'Name', key: 'name', sortable: true },
          { title: 'Email', key: 'email', sortable: true },
          { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
        ],
        newHeaders: [
          { title: 'ID', key: 'id', sortable: true },
          { title: 'Name', key: 'name', sortable: true },
          { title: 'Email', key: 'email', sortable: true },
          { title: 'Status', key: 'status', sortable: false, align: 'center' },
        ],
      }
    },
    computed: {
      legacyClientsCount() {
        return this.legacyClients.filter(c => !c.migrated).length
      },
    },
    mounted() {
      this.fetchClients()
    },
    methods: {
      async fetchClients() {
        this.loading = true
        try {
          const [legacyResponse, newResponse] = await Promise.all([
            api.getLegacyClients(),
            api.getNewClients(),
          ])
          
          this.legacyClients = legacyResponse.data.filter(c => !c.migrated)
          this.newClients = newResponse.data
        } catch (error) {
          this.showSnackbar('Error fetching clients: ' + error.message, 'error')
        } finally {
          this.loading = false
        }
      },
      
      async migrateClient(clientId) {
        this.migrating = clientId
        try {
          await api.migrateClient(clientId)
          
          const client = this.legacyClients.find(c => c.id === clientId)
          this.showSnackbar(`Client "${client.name}" migrated successfully!`, 'success')
          
          await this.fetchClients()
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message
          this.showSnackbar('Migration failed: ' + errorMessage, 'error')
        } finally {
          this.migrating = null
        }
      },
      
      showSnackbar(message, color) {
        this.snackbar = {
          show: true,
          message,
          color,
        }
      },
    },
  }
  </script>
  
  <style>
  .bg-orange {
    background-color: #FF9800 !important;
  }
  
  .bg-success {
    background-color: #4CAF50 !important;
  }
  </style>