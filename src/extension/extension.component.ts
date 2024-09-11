import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

declare const chrome: any;

@Component({
  selector: 'app-extension',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extension.component.html',
  styleUrl: './extension.component.css'
})
export class ExtensionComponent implements OnInit  {
  private clientId: string;
  private tenantId: string;
  private clientSecret: string;

  constructor() { 
    this.clientId = environment.azureAd.clientId;
    this.tenantId = environment.azureAd.tenantId;
    this.clientSecret = environment.azureAd.clientSecret;
  }

  ngOnInit(): void {
  }

  authenticate() {

    // const redirectUri = chrome.identity.getRedirectURL();
    const redirectUri = 'http://localhost:8080/callback';
    const scope = 'openid profile email'; // Adjust scopes as needed


    // const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=https%3A%2F%2Fgraph.microsoft.com%2FUser.Read.All+offline_access+openid+profile`

    const authUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/authorize?` +
      `client_id=${this.clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_mode=fragment`;

    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      async (responseUrl: string) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        const urlParams = new URLSearchParams(responseUrl.split('#')[1]);
        const code = urlParams.get('code');

        if (code) {
          try {
            const tokenResponse = await this.getAccessToken(code, this.clientId, redirectUri, this.tenantId, this.clientSecret);
            console.log('Access Token:', tokenResponse.access_token);
            // Use the access token to make API requests
          } catch (error) {
            console.error('Error getting access token:', error);
          }
        } else {
          console.error('Authentication failed');
        }
      }
    );
  }

  async getAccessToken(code: string, clientId: string, redirectUri: string, tenantId: string, clientSecret: string): Promise<any> {
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
      client_secret: clientSecret
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    return response.json();
  }


}
