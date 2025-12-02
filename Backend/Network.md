# Network Configuration

## VLAN Setup
- VM1 (Frontend): 192.168.56.101/24 - Public + Private access
- VM2 (Backend API): 192.168.56.102/24 - Private only
- VM3 (Database): 192.168.56.103/24 - Private only
- VM4 (Auth/Monitoring): 192.168.56.104/24 - Private only

## Network Architecture
- All VMs connected via VMnet2 (VLAN)
- VM1 acts as gateway with IP forwarding enabled
- VM2, VM3, VM4 route through VM1 for internet access
