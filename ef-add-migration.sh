#!/bin/sh

dotnet ef migrations add $1 --project Izopropylen.Data --startup-project Izopropylen.Api