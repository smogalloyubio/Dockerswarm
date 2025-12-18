{{/*
Return the fully qualified app name
*/}}
{{- define "bitcoin-app.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}

{{/*
Return common labels
*/}}
{{- define "bitcoin-app.labels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Return selector labels
*/}}
{{- define "bitcoin-app.selectorLabels" -}}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Return service account name
*/}}
{{- define "bitcoin-app.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{ include "bitcoin-app.fullname" . }}
{{- else }}
default
{{- end }}
{{- end }}
