#!/bin/bash

# Update UI component imports
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/ui/|@/app/_components/ui/|g'

# Update notification component imports
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/notifications/|@/components/shared/notifications/|g'

# Update game type imports
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/types/game|@/types/game/core|g'

# Update dashboard type imports
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/types/dashboard|@/types|g'

# Update navigation type imports
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/types/navigation|@/types/components/navigation|g'
